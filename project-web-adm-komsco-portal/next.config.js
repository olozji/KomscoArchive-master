/** @type {import('next').NextConfig} */
const nextConfig = {
  exportTrailingSlash: true,
  images: {
    loader: 'akamai',
    path: '',
  },
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = nextConfig;
