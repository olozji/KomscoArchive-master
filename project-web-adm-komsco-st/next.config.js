/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'akamai',
    path: '',
  },
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = nextConfig;
