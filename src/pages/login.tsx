/**
 * Halaman Login yang Diperbaiki
 * pages/login.tsx
 */
 import { useState } from 'react';
 import { getSession, signIn } from 'next-auth/react';
 import { GetServerSideProps } from 'next';
 import Head from 'next/head';
 import Image from 'next/image';
 import Link from 'next/link';
 import styles from '../styles/Login.module.css';
 
 export default function Login() {
   const [loading, setLoading] = useState({
     google: false,
     facebook: false,
   });
 
   // Handler untuk sign in
   const handleSignIn = async (provider: string) => {
     try {
       setLoading({ ...loading, [provider]: true });
       await signIn(provider, { callbackUrl: '/' });
     } catch (error) {
       console.error(`Error signing in with ${provider}:`, error);
       setLoading({ ...loading, [provider]: false });
     }
   };
 
   return (
     <div className={styles.container}>
       <Head>
         <title>Sign In - Haris News</title>
         <meta name="description" content="Sign in to access your personalized news feed" />
         <link rel="icon" href="/favicon.ico" />
       </Head>
 
       <main className={styles.main}>
         <div className={styles.loginCard}>
           <div className={styles.logoContainer}>
             <div className={styles.logo}>
               <span className={styles.logoIcon}>H</span>
               <h1 className={styles.logoText}>Haris News</h1>
             </div>
           </div>
 
           <h2 className={styles.title}>Sign in to Haris News</h2>
           <p className={styles.description}>Access your personalized news feed</p>
 
           <div className={styles.authButtons}>
             <button
               onClick={() => handleSignIn('google')}
               disabled={loading.google}
               className={`${styles.authButton} ${styles.googleButton}`}
             >
               <div className={styles.authButtonContent}>
                 <div className={styles.authButtonIcon}>
                   <svg viewBox="0 0 24 24" width="24" height="24">
                     <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                       <path
                         fill="#4285F4"
                         d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                       />
                       <path
                         fill="#34A853"
                         d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                       />
                       <path
                         fill="#FBBC05"
                         d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                       />
                       <path
                         fill="#EA4335"
                         d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                       />
                     </g>
                   </svg>
                 </div>
                 <span>Sign in with Google</span>
                 {loading.google && <div className={styles.buttonSpinner}></div>}
               </div>
             </button>
 
             <button
               onClick={() => handleSignIn('facebook')}
               disabled={loading.facebook}
               className={`${styles.authButton} ${styles.facebookButton}`}
             >
               <div className={styles.authButtonContent}>
                 <div className={styles.authButtonIcon}>
                   <svg viewBox="0 0 24 24" width="24" height="24">
                     <path
                       fill="#1877F2"
                       d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                     />
                   </svg>
                 </div>
                 <span>Sign in with Facebook</span>
                 {loading.facebook && <div className={styles.buttonSpinner}></div>}
               </div>
             </button>
           </div>
 
           <div className={styles.termsSection}>
             <p className={styles.termsText}>
               By continuing, you agree to our{' '}
               <Link href="/terms" className={styles.termsLink}>
                 Terms of Service
               </Link>
             </p>
           </div>
         </div>
       </main>
 
       <footer className={styles.footer}>
         <div className={styles.footerContent}>
           <p>&copy; {new Date().getFullYear()} Haris News. All rights reserved.</p>
         </div>
       </footer>
     </div>
   );
 }
 
 export const getServerSideProps: GetServerSideProps = async (context) => {
   const session = await getSession(context);
 
   // Redirect ke halaman utama jika sudah login
   if (session) {
     return {
       redirect: {
         destination: '/',
         permanent: false,
       },
     };
   }
 
   return {
     props: {},
   };
 };