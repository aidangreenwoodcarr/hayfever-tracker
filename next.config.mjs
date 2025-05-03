/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Copy the Prisma engine binary to the output directory
      config.experiments = { ...config.experiments, topLevelAwait: true };
      
      // Add a copy plugin to properly bundle the binary
      config.externals = [...config.externals, 'prisma', '@prisma/client/runtime'];
    }
    
    return config;
  },
  
  // Make sure the Prisma binary is included in the output
  output: 'standalone',
  outputFileTracing: true,
  experimental: {
    // Optional: If you're using app directory
    serverComponentsExternalPackages: ['@prisma/client', 'prisma']
  }
}

export default nextConfig
