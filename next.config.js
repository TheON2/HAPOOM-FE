/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.ytimg.com'],
  },
  pwa: {
    dest: 'public',
    disable: process.env.NEXT_PUBLIC_NODE_ENV === 'development',
  },
};

module.exports = nextConfig;
