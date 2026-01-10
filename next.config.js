/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export (required for Netlify push‑deploy)
  output: 'export',
  // Future‑proof flags
  reactStrictMode: true,
  swcMinify: true,
  // Optional: custom image domains if you later host external assets
  images: {
    unoptimized: true // because we use a static export, disable Next image optimization
  },
  // Make TypeScript errors fail the build (good for forensic rigor)
  eslint: {
    ignoreDuringBuilds: false
  }
};

module.exports = nextConfig;