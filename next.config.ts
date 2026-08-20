import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  serverExternalPackages: ["pg", "sharp"],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
