/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['openai.com', 'anthropic.com', 'google.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig; 