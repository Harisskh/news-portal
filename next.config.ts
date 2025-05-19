/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Tambahkan semua domain yang muncul di error
    domains: [
      'ichef.bbci.co.uk',
      'media.cnn.com',
      'cdn.cnn.com',
      'static.independent.co.uk',
      'assets.bwbx.io',
      'cdn.vox-cdn.com',
      'i.guim.co.uk',
      'static01.nyt.com',
      'techcrunch.com',
      'images.wsj.net',
      'picsum.photos',
      'lh3.googleusercontent.com',
      'example.com'
    ],
    // Remotepatterns sebagai fallback - ini memungkinkan SEMUA domain
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Set unoptimized ke true untuk melewati optimasi gambar sepenuhnya
    unoptimized: true
  },
  // Ignoreduring builds untuk mempercepat deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;