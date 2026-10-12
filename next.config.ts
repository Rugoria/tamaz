import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Let other devices on the local network load dev assets (e.g. http://192.168.x.x:3000). Dev server only.
  allowedDevOrigins: ["192.168.*.*"],
};

export default nextConfig;
