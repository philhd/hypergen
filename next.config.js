/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
    // Allow unoptimized images in development for easier testing
    unoptimized: process.env.NODE_ENV === 'development',
  },
}

module.exports = nextConfig 