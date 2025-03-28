/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], // Ensure this is empty if only using local images
    unoptimized: true, // Try setting this if using local images without an external image loader
  },
};

module.exports = nextConfig;
