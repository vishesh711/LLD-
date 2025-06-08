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
    
    return config;
  },
};

export default nextConfig; 