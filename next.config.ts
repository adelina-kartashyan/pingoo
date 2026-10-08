import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // No ESLint setup yet — don't let a missing config block deploys.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
