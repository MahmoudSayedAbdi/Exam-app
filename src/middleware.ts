import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


const authPages = new Set(["/auth/signin", "/auth/signup" , "/auth/forgotPassword"  , "/auth/verifyCode" ,"/auth/setPassword" ]);
const publicPages = new Set([ ...Array.from(authPages)]);


export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  
  if (publicPages.has(req.nextUrl.pathname)) {
    if (!token) return NextResponse.next();

    if (authPages.has(req.nextUrl.pathname)) {
      const redirectUrl = new URL('/dashboard' , req.nextUrl.origin);
      return NextResponse.redirect(redirectUrl);
    }
  }

  if(token) return NextResponse.next();

  const redirectUrl = new URL('/auth/signin' , req.nextUrl.origin);
  return NextResponse.redirect(redirectUrl); 

}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}