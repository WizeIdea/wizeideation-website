/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep React strict mode (good forensic practice)
  reactStrictMode: true,

  // Turn off Next‑image optimisation – we export static files
  images: {
    unoptimized: true,
  },

  // If you want any other experimental flags, add them here.
  // (No `swcMinify` or `eslint` – those are now removed in Next 16)
};

export default nextConfig;
