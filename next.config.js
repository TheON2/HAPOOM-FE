/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: true,
});

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'i.ytimg.com', 'avatars.githubusercontent.com'],
  },
});