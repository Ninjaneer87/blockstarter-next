/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === "production";
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: `${isProduction ? "./" : "/"}`,
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
