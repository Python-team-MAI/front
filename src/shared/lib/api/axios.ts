import axios from "axios";

let isRefreshing = false;
let failedQueue: Array<{
	resolve: (token: string) => void;
	reject: (error: string | null) => void;
}> = [];

const processQueue = (error?: string | null, token?: string) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token!);
		}
	});
	failedQueue = [];
};

export const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		"Access-Control-Allow-Origin": "*",
	},
	withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
	const accessToken = document.cookie
		.split("; ")
		.find((row) => row.startsWith("access_token="))
		?.split("=")[1];

	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then((token) => {
						originalRequest.headers.Authorization = `Bearer ${token}`;
						return axiosInstance(originalRequest);
					})
					.catch((reject) => Promise.reject(reject));
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const { data } = await axios.post(
					process.env.NEXT_PUBLIC_API_URL + "/v1/auth/refresh",
					{},
					{
						withCredentials: true,
					}
				);

				document.cookie = `access_token=${data.access_token}; path=/; secure`;
				document.cookie = `refresh_token=${data.refresh_token}; path=/; secure`;

				originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

				processQueue(null, data.access_token);
				return axiosInstance(originalRequest);
			} catch (refreshError) {
				document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
				document.cookie = "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
				window.location.href = "/ru/login";
				processQueue(refreshError as string, undefined);
				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		}
		return Promise.reject(error);
	}
);
