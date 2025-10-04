/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['progres.mesrs.dz'],
  },
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://buvfbqwsfcjiqdrqczma.supabase.co/functions/v1/proxy-progres?endpoint=api/:path*',
      },
    ]
  },
}

module.exports = nextConfig

