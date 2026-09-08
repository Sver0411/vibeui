/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // lucide-react / framer-motion 按需引入优化，压缩图标与动画包体积
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async headers() {
    return [
      {
        // 资源源码 API：内容随构建变更，允许短期缓存 + 后台刷新
        source: "/api/resources/:slug",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
