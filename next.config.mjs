/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [{ hostname: 'picsum.photos' }],
    qualities: [25, 50, 65, 69, 71, 72, 75, 100],
  },
};

export default nextConfig;
