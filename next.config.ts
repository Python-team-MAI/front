import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/entities/i18n/request.ts");

const nextConfig: NextConfig = {
	transpilePackages: ["three"],
	output: "standalone",
	reactStrictMode: false,
};

export default withNextIntl(nextConfig);
