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
						value: "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;",
					},
				],
			},
		];
	},
};

export default withNextIntl(nextConfig);
