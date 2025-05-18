/**
 * Navbar Component with Logout Button
 * components/Navbar.tsx
 */
 import { useSession, signOut } from 'next-auth/react';
 import Link from 'next/link';
 import styles from '../styles/Navbar.module.css';
 
 export default function Navbar() {
   const { data: session } = useSession();
 
   const handleLogout = async () => {
     // Sign out dan arahkan ke halaman login
     await signOut({ callbackUrl: '/login' });
   };
 
   return (
     <header className={styles.navbar}>
       <div className={styles.container}>
         <Link href="/" className={styles.logo}>
           <div className={styles.logoIcon}>H</div>
           <span className={styles.logoText}>Haris News</span>
         </Link>
 
         <div className={styles.navRight}>
           {session ? (
             <div className={styles.userSection}>
               <div className={styles.userInfo}>
                 {session.user?.image ? (
                   <img
                     src={session.user.image}
                     alt={session.user.name || 'User'}
                     className={styles.userAvatar}
                   />
                 ) : (
                   <div className={styles.userAvatarPlaceholder}>
                     {session.user?.name?.charAt(0) || 'U'}
                   </div>
                 )}
                 <span className={styles.userName}>{session.user?.name}</span>
               </div>
               <button onClick={handleLogout} className={styles.logoutButton}>
                 Logout
               </button>
             </div>
           ) : (
             <Link href="/login" className={styles.loginButton}>
               Sign In
             </Link>
           )}
         </div>
       </div>
     </header>
   );
 }