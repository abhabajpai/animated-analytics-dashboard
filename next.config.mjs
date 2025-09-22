/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Performance optimizations
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Temporarily disabled experimental features for stable build
  // experimental: {
  //   optimizeCss: true,
  //   optimizePackageImports: ['framer-motion', 'lucide-react', 'recharts'],
  // },
}

export default nextConfig
