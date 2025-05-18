import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Paths that don't require authentication
const publicPaths = ['/login', '/api/auth'];

// Check if a path should be accessible without authentication
const isPublicPath = (path: string) => {
  return publicPaths.some(publicPath => path.startsWith(publicPath));
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is a public path (doesn't require authentication)
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }
  
  // Check if user is authenticated
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  
  // If not authenticated, redirect to login
  if (!token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }
  
  // User is authenticated, proceed to the requested page
  return NextResponse.next();
}

// Configure paths that should be checked by middleware
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes that don't require authentication
     * 2. /_next (Next.js internals)
     * 3. /static (static files)
     * 4. All files in the public folder
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|/static).*)',
  ],
};