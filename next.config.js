/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Optimize for production
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
  // Enable compression
  compress: true,
  // Optimize images
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
}

module.exports = nextConfig
