module.exports = {
  reactStrictMode: true,
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["example.com", "cdn.pixabay.com"],
  },
};

module.exports = nextConfig;