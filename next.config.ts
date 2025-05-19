import type { NextConfig } from "next";

// Konfigurasi untuk menonaktifkan strict mode dan mengatur eslint sementara

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Matikan strict mode sementara selama pengembangan
  eslint: {
    // Hanya warning, tidak menggagalkan build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Hanya warning TypeScript, tidak menggagalkan build
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com','picsum.photos', 'example.com'],
    // Tambahkan domain lain yang mungkin Anda gunakan untuk gambar
  },
}

module.exports = nextConfig

export default nextConfig;

// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
}

module.exports = {
  eslint: {
    ignoreDuringBuilds: true, // ini akan biarkan build lanjut walaupun ada error lint
  },
};

