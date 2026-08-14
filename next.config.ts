import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  serverExternalPackages: ["pg"],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
