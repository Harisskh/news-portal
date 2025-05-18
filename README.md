# Haris News Portal

Aplikasi portal berita yang dibangun dengan Next.js dan OAuth2 untuk tugas evaluasi.

## Fitur

- Autentikasi dengan Google OAuth2
- Menampilkan berita dari berbagai sumber
- Filtering berita berdasarkan sumber
- Halaman detail berita
- Responsif untuk berbagai ukuran layar

## Teknologi yang Digunakan

- **Next.js** - Framework React untuk server-side rendering
- **TypeScript** - Bahasa pemrograman dengan typing
- **NextAuth.js** - Autentikasi OAuth untuk Next.js
- **CSS Modules** - Styling yang termodulasi
- **News API** - API untuk mendapatkan berita dari berbagai sumber

## Setup Proyek

### 1. Clone repositori dan install dependencies

```bash
git clone 
cd news-portal
npm install
```

### 2. Konfigurasi environment variables

Buat file `.env.local` di root proyek dengan konten berikut:

```
# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# News API
NEWS_API_KEY=your-newsapi-key
```

### 3. Jalankan aplikasi untuk development

```bash
npm run dev
```

Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000).

## Struktur Project

```
news-portal/
├── components/         # Komponen React yang dapat digunakan kembali
├── lib/                # Utilitas dan fungsi helper
├── pages/              # Halaman Next.js dan API routes
│   ├── api/            # Next.js API routes
│   └── news/           # Halaman detail berita
├── public/             # Aset statis
├── styles/             # File CSS
└── types/              # Tipe TypeScript
```

## Spesifikasi Tugas

1. Next.js:
   - Halaman login dengan OAuth2
   - Halaman daftar berita utama
   - Halaman detail berita

2. OAuth2:
   - Integrasi dengan Google

3. Portal Berita:
   - Sumber minimal dari 3 portal berita berbeda
   - Menampilkan daftar berita utama dari setiap portal
   - Menampilkan detail berita
   - Data seragam (waktu, ukuran gambar, panjang judul)

## Setup News API

Untuk menggunakan News API:

1. Daftar akun di [News API](https://newsapi.org/) dan dapatkan API key
2. Tambahkan API key ke file `.env.local` sebagai `NEWS_API_KEY`

## Deployment

Aplikasi dapat di-deploy menggunakan Vercel:

1. Push repositori ke GitHub
2. Connect ke Vercel
3. Set environment variables di Vercel dashboard



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
