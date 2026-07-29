/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [{ source: "/editor", destination: "/editor/index.html" }];
  },
};

export default nextConfig;
