// File: src/pages/_document.tsx
// Implementasi SEO dan JSON-LD Schema

import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

// Pastikan class diekspor sebagai 'default'
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Preconnect to Google for faster OAuth loading */}
          <link rel="preconnect" href="https://accounts.google.com" />
          <link rel="preconnect" href="https://lh3.googleusercontent.com" />
          
          {/* Web App Manifest */}
          <link rel="manifest" href="/manifest.json" />
          
          {/* Font preloading */}
          <link
            rel="preload"
            href="/fonts/inter-var.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          
          {/* Meta tags for SEO */}
          <meta name="application-name" content="Haris News" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Haris News" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#0070f3" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#0070f3" />
          
          {/* Favicon and app icons */}
          <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
          <link rel="shortcut icon" href="/favicon.ico" />
          
          {/* Canonical tag for duplicated content */}
          <link rel="canonical" href="https://harisnews.vercel.app" />
          
          {/* Structured data with JSON-LD for NewsArticle */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Haris News",
                "url": "https://harisnews.vercel.app",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://harisnews.vercel.app/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Haris News",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://harisnews.vercel.app/icons/icon-512x512.png"
                  }
                }
              })
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}