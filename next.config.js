/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
  },
  // i18n configuration will be added in Phase 3
}

module.exports = nextConfig
