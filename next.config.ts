import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/:lang(en|ar|tr)/apps",
        destination: "/:lang/apps/sila",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
