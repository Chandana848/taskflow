import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // Enable standalone build for Docker production image
  output: 'standalone',

  // Enable partial prefetching for better performance
  partialPrefetching: true,

  // Cache React components (Next.js 15+)
  cacheComponents: true,

  // Turbopack configuration (for `next dev --turbo`)
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
    resolveAlias: {
      '@': path.resolve('./src'),
      '@/components': path.resolve('./src/components'),
      '@/lib': path.resolve('./src/lib'),
      '@/hooks': path.resolve('./src/hooks'),
      '@/store': path.resolve('./src/store'),
      '@/types': path.resolve('./src/types'),
      '@/styles': path.resolve('./src/styles'),
    },
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Webpack configuration (for `next build` and `next dev` without turbopack)
  webpack(config) {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias as Record<string, string>),
      '@': path.resolve('./src'),
    };
    return config;
  },
};

export default nextConfig;
