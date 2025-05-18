/**
 * NextAuth configuration with Google and Facebook providers
 * pages/api/auth/[...nextauth].ts
 */
 import NextAuth from 'next-auth';
 import GoogleProvider from 'next-auth/providers/google';
 import FacebookProvider from 'next-auth/providers/facebook';
 
 export default NextAuth({
   providers: [
     GoogleProvider({
       clientId: process.env.GOOGLE_CLIENT_ID || '',
       clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
     }),
     FacebookProvider({
       clientId: process.env.FACEBOOK_CLIENT_ID || '',
       clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
     }),
   ],
   pages: {
     signIn: '/login',
   },
   callbacks: {
     async session({ session, token, user }) {
       // Add user info to the session
       return session;
     },
     async jwt({ token, user, account, profile }) {
       // Add access_token to the token
       if (account) {
         token.accessToken = account.access_token;
       }
       return token;
     },
   },
   secret: process.env.NEXTAUTH_SECRET,
 });