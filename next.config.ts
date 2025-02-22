import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/entities/i18n/request.ts')

const nextConfig: NextConfig = {
    /* config options here */
    transpilePackages: ['three'],
}

export default withNextIntl(nextConfig)
