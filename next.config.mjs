/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [{ source: "/atendente", destination: "/atendente/index.html" }];
  }
};
export default nextConfig;
