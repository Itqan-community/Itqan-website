const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['localhost', 'itqan.dev'],
    unoptimized: true,
  },
  // Enable static exports for Netlify
  trailingSlash: true,
};

module.exports = withNextIntl(nextConfig); 