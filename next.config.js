/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: "/",
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
