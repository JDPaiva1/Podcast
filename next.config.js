/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:slug.:id",
        destination: "/channel?slug=:slug&id=:id",
      },
      {
        source: "/:slugChannel.:idChannel/:slug.:id",
        destination:
          "/podcast?slugChannel=:slugChannel&idChannel=:idChannel&slug=:slug&id=:id",
      },
    ];
  },
};

module.exports = nextConfig;
