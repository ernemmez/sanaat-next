/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
      {
        protocol: "https",
        hostname: "sanaat.org",
      },
      {
        protocol: "https",
        hostname: "sanaat-admin-a83e27304db1.herokuapp.com",
      },
    ],
  },
};

module.exports = nextConfig;
