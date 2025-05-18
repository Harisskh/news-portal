import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { signIn, getProviders } from 'next-auth/react';
import React from 'react';
import styles from '../styles/Login.module.css';

type Provider = {
  id: string;
  name: string;
};

type LoginProps = {
  providers: Record<string, Provider>;
};

export default function Login({ providers }: LoginProps) {
  const router = useRouter();
  const { callbackUrl } = router.query;

  return (
    <div className={styles.container}>
      <Head>
        <title>Sign In - Haris News | Your Personalized News Portal</title>
        <meta name="description" content="Sign in to Haris News to access your personalized news feed from top sources around the web." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://harisnews.com/login" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://harisnews.com/login" />
        <meta property="og:title" content="Sign In - Haris News" />
        <meta property="og:description" content="Access your personalized news feed from top sources around the web." />
        <meta property="og:image" content="https://harisnews.com/images/og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://harisnews.com/login" />
        <meta property="twitter:title" content="Sign In - Haris News" />
        <meta property="twitter:description" content="Access your personalized news feed from top sources around the web." />
        <meta property="twitter:image" content="https://harisnews.com/images/twitter-image.jpg" />
      </Head>

      <div className={styles.loginCard}>
        <h1 className={styles.title}>Haris News</h1>
        <p className={styles.subtitle}>Sign in to access your personalized news feed</p>

        <div className={styles.providerContainer}>
          <p className={styles.chooseText}>Sign in with your preferred account</p>
          
          <div className={styles.providersGrid}>
            {Object.values(providers || {}).map((provider) => (
              <button
                key={provider.id}
                onClick={() => signIn(provider.id, { callbackUrl: (callbackUrl as string) || '/' })}
                className={`${styles.providerButton} ${styles[provider.id.toLowerCase()]}`}
                aria-label={`Sign in with ${provider.name}`}
              >
                {provider.id === 'google' && (
                  <span className={styles.providerIcon}>
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                        <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"></path>
                        <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"></path>
                        <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"></path>
                        <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"></path>
                      </g>
                    </svg>
                  </span>
                )}
                <span>
                  {provider.id === 'google' ? 'Google' : provider.name}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        <p className={styles.termsText}>
          By continuing, you agree to our <a href="/terms">Terms of Service</a>
        </p>
      </div>

      {/* Schema.org JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            'name': 'Sign In - Haris News',
            'description': 'Sign in to Haris News to access your personalized news feed.',
            'publisher': {
              '@type': 'Organization',
              'name': 'Haris News',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://harisnews.com/logo.png'
              }
            },
            'potentialAction': {
              '@type': 'LoginAction',
              'target': {
                '@type': 'EntryPoint',
                'urlTemplate': 'https://harisnews.com/login',
                'actionPlatform': [
                  'https://schema.org/DesktopWebPlatform',
                  'https://schema.org/MobileWebPlatform'
                ]
              },
              'httpMethod': 'POST'
            }
          })
        }}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  
  return {
    props: {
      providers: providers ?? {}
    }
  };
};