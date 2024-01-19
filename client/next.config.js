/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["sequelize", "sequelize-typescript"],
  },
  images: {
    domains: ['cityluxedxb.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
