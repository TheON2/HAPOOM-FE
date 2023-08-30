const withPWA = require('next-pwa')({
  dest: 'public',
  swSrc: 'public/sw-custom.js',
  sw: 'service-worker.js',
});

module.exports = withPWA({
  reactStrictMode: false,
  images: {
    domains: [
      'localhost',
      'i.ytimg.com',
      'avatars.githubusercontent.com',
      'k.kakaocdn.net',
      'lh3.googleusercontent.com',
      'ssl.pstatic.net',
      '13.209.98.145',
      'hapoomimagebucket.s3.ap-northeast-2.amazonaws.com',
      '13.209.98.145',
    ],
  },
});
