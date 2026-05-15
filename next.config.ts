import path from 'node:path';
import type { NextConfig } from 'next';

const PLATFORM_ORIGIN = 'https://ggumul.com';

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [
      {
        source: '/writing/:slug',
        destination: `${PLATFORM_ORIGIN}/posts/:slug`,
        permanent: true,
      },
      {
        source: '/writing',
        destination: `${PLATFORM_ORIGIN}/posts`,
        permanent: true,
      },
      {
        source: '/projects/:slug',
        destination: `${PLATFORM_ORIGIN}/projects/:slug`,
        permanent: true,
      },
      {
        source: '/projects',
        destination: `${PLATFORM_ORIGIN}/projects`,
        permanent: true,
      },
      {
        source: '/media/:path*',
        destination: `${PLATFORM_ORIGIN}/media/:path*`,
        permanent: true,
      },
      {
        source: '/',
        destination: PLATFORM_ORIGIN,
        permanent: true,
      },
      {
        source: '/:path*',
        destination: PLATFORM_ORIGIN,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
