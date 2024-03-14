// import {authConfig} from "@/configs/auth";
// import NextAuth from "next-auth"
//
//
// const handler = NextAuth(authConfig);
//
//
//
// export { handler as GET, handler as POST }

// import { AuthOptions } from "next-auth";

// export const authConfig: AuthOptions = {
//     providers: [
//         // ... інші провайдери
//     ],
//     callbacks: {
//         async session(session, user) {
//             // Перевірте, чи маршрут належить до публічних API маршрутів
//             const isPublicRoute = session.req.url.startsWith("/api/public");
//
//             // Якщо це публічний маршрут, встановіть користувача в null (автентифікація не потрібна)
//             if (isPublicRoute) {
//                 session.user = null;
//             }
//
//             return session;
//         },
//     },
//     // ... інші конфігурації
// };
// import NextAuth, {User} from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import GoogleProvider from "next-auth/providers/google"
// import {NextApiRequest, NextApiResponse} from "next";
// import {env} from "@/env.mjs";
// import {setJwtAccessToken, setJwtRefreshToken} from "@/app/(protected)/jwtSessionService/SetHttpOnlyCookies";
//
// type SuccessLoginResponse = {
//
//     jwtAccessToken: string;
//
//     jwtRefreshToken: string;
//
//     id: string;
//
//     name: string;
//
//     image: string;
// };
//
// export default async function auth(req: NextApiRequest, res: NextApiResponse) {
//     const providers = [
//         CredentialsProvider({
//             credentials: {
//                 email: {label: 'emeil', type: 'email', required: true},
//                 password: {label: 'password', type: 'password', required: true},
//             },
//
//             async authorize(credentials) {
//                 if (!credentials?.email || !credentials.password) return null;
//                 const formData = {
//                     email: credentials.email,
//                     password: credentials.password
//                 }
//                 const response = await fetch(env.SERVER_API_URL + '/api/auth/login', {
//                     method: 'POST',
//                     body: JSON.stringify(formData),
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//
//                 });
//
//                 if (response.status === 401) {
//                     return null;
//                 }
//                 if (response.status === 200) {
//                     const user = (await response.json()) as SuccessLoginResponse;
//                     setJwtAccessToken(user.jwtAccessToken);
//                     setJwtRefreshToken(user.jwtRefreshToken)
//                     return user as User;
//                 }
//
//                 return null;
//             }
//         }),
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID!,
//             clientSecret: process.env.GOOGLE_SECRET!,
//         }),
//     ]
//
//
//
//     return await NextAuth(req, res, {
//
//         providers,
//         callbacks:{
//             async redirect({url, baseUrl}) {
//                 return url;
//             },
//             async session({ session, token, user }) {
//                 if (session.expires) {
//                     return {
//                         ...session,
//                         error: 'Session revoked due to session change',
//                         active: false,
//                     };
//                 }
//                 return session
//             },
//             async signIn({account, profile, user, credentials}) {
//                 if (account?.provider === "google") {
//                     if (profile?.email!) {
//                         const formData = {
//                             email: profile.email,
//                             name: profile.name,
//                             image: user.image
//                         }
//                         const response = await fetch(env.SERVER_API_URL + '/api/auth/google', {
//                             method: 'POST',
//                             body: JSON.stringify(formData),
//                             headers: {
//                                 'Content-Type': 'application/json'
//                             }
//                         });
//                         if (response.status === 200) {
//
//                             const user = (await response.json()) as SuccessLoginResponse;
//                             profile.image = user.image;
//                             setJwtAccessToken(user.jwtAccessToken);
//                             setJwtRefreshToken(user.jwtRefreshToken);
//                             return true;
//                         }
//                     }
//
//                     return false;
//                 } else  if (account?.provider === "credentials") {
//                     return true;
//                 }
//                 return false;
//             },
//         }
//
//     })
// }
