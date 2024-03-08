//
// export { default } from 'next-auth/middleware';
//
// import { NextResponse } from "next/server";
// import type { NextRequest } from 'next/server'
// import { getToken } from 'next-auth/jwt';
//
// export async function middleware(req: NextRequest, res: NextResponse) {
//     const token = await getToken({ req });
//     const isAuthenticated = !!token;
//
//     if(!)
//
//
//     if (req.nextUrl.pathname.startsWith('/login') && isAuthenticated) {
//         const url = req.nextUrl.clone()
//         url.pathname = '/'
//         return NextResponse.redirect(url);
//     }
//
//
//     return NextResponse.next();
// }