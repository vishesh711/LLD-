/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Optimizes for production deployments
  compress: true, // Enable compression
  poweredByHeader: false, // Remove X-Powered-By header for security
  reactStrictMode: true,
  swcMinify: true, // Use SWC for minification
  
  // Add webpack config for syntax highlighting
  webpack: (config, { isServer }) => {
    // For syntax highlighting in production
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      fs: false,
      path: false
    };
    
    // Ensure server-only modules are not included in the client bundle
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        'fs/promises': false
      };
    }
    
    return config;
  },
  
  // Experimental features
  experimental: {
    serverComponentsExternalPackages: ['fs', 'path', 'fs/promises']
  },

  // Ensure proper trailingSlash behavior for clean URLs
  trailingSlash: true,
  
  // Fix issues with dynamic routes
  async rewrites() {
    return [
      {
        source: '/projects/:filename*',
        destination: '/projects/:filename*',
      },
    ];
  }
};

export default nextConfig; 