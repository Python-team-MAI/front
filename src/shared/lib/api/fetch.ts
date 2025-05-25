import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "./axios";

export const serverFetch = async (input: string, init?: RequestInit) => {
	return fetch(`${process.env.NEXT_PUBLIC_API_URL}${input}`, {
		headers: {
			"Content-Type": "application/json",
			...init?.headers,
		},
		credentials: "include",
		...init,
	});
};

export const clientFetch = async (input: string, init?: AxiosRequestConfig) => {
	return axiosInstance(input, init);
};

const isRequestInit = (init?: unknown): init is RequestInit => {
	return typeof window === "undefined";
};

export const $fetch = <isServer extends boolean = true>(
	url: string,
	init?: isServer extends true ? RequestInit : AxiosRequestConfig
): isServer extends true ? Promise<Response> : Promise<AxiosResponse> => {
	if (isRequestInit(init)) {
		return serverFetch(url, init) as isServer extends true ? Promise<Response> : Promise<AxiosResponse>;
	} else {
		return clientFetch(url, init) as isServer extends true ? Promise<Response> : Promise<AxiosResponse>;
	}
};
