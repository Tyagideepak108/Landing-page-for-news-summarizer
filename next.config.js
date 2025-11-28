/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.optimization = {
      ...config.optimization,
      minimize: true,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          three: {
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            name: 'three',
            priority: 10,
          },
        },
      },
    }
    return config
  },
  compress: true,
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
}

module.exports = nextConfig
