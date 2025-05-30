import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/entities/i18n/request.ts");

const nextConfig: NextConfig = {
	transpilePackages: ["three"],
	output: "standalone",
	reactStrictMode: false,
	headers: async () => {
		return [
			{
				source: "/:path*",
				headers: [
					{
						key: "Content-Security-Policy",
						value:
							"default-src 'self' http: https: data: 'unsafe-inline' 'unsafe-eval'; connect-src 'self' http: https: ws: wss:; worker-src 'self' blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:; script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' blob:;",
					},
				],
			},
		];
	},
};

export default withNextIntl(nextConfig);
