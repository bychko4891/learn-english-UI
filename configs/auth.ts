// import NextAuth, {AuthOptions, User} from "next-auth";
// import GoogleProvider from 'next-auth/providers/google';
// import Credentials from 'next-auth/providers/credentials'
// import {env} from "@/env.mjs";
// import {setJwtAccessToken, setJwtRefreshToken} from "@/app/(protected)/jwtSessionService/SetHttpOnlyCookies";
//
//
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
// export const authConfig: AuthOptions = {
//     // adapter:
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID!,
//             clientSecret: process.env.GOOGLE_SECRET!,
//             profileUrl: "https://www.googleapis.com/oauth2/v3/userinfo",
//         }),
//         Credentials({
//             credentials: {
//                 email: {label: 'emeil', type: 'email', required: true},
//                 password: {label: 'password', type: 'password', required: true},
//             },
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
//                     // console.log(response);
//                     return null;
//                 }
//                 if (response.status === 200) {
//                     const user = (await response.json()) as SuccessLoginResponse;
//                     // console.log(user.id + ' id user');
//                     // console.log(user.name + ' id user');
//                     // console.log(user.jwtAccessToken + ' jwtAccessToken');
//                     // console.log(user.jwtRefreshToken + ' jwtRefreshToken');
//                     setJwtAccessToken(user.jwtAccessToken);
//                     setJwtRefreshToken(user.jwtRefreshToken);
//                     // console.log(user + ' user !!! !!!');
//                     return user as User;
//                 }
//
//                 return null;
//             }
//         }),
//     ],
//
//     pages: {
//         signIn: '/login',
//         // error: '/your-custom-error-page', // вказуйте свою власну сторінку для обробки помилок
//         // signIn: '/signin', // сторінка для входу
//         // signOut: '/settings', // сторінка для виходу
//         // newUser: '/newuser', // сторінка для нових користувачів
//
//     },
//
//     callbacks: {
//         async redirect({url, baseUrl}) {
//             // return baseUrl;
//             return url;
//         },
//         async session({ session, token, user }) {
//             // Send properties to the client, like an access_token and user id from a provider.
//             // session.accessToken = token.accessToken
//             // session.user.id = token.id
//
//             if (session.expires) {
//                 // Скасовуємо сесію користувача
//                 return {
//                     ...session,
//                     error: 'Session revoked due to session change',
//                     active: false, // Встановлюємо сесію як неактивну
//                 };
//             }
//             return session
//         },
//         async signIn({account, profile}) {
//             console.log(" sign In **************** !!!!!!!!!!!!!!!!!!! ******************** !!!!!!!!!!!!!!!!!!!")
//             if (account?.provider === "google") {
//                 if (profile?.email!) {
//                     const formData = {
//                         email: profile.email,
//                         name: profile.name,
//                         image: profile.image
//                     }
//                     const response = await fetch(env.SERVER_API_URL + '/api/auth/google', {
//                         method: 'POST',
//                         body: JSON.stringify(formData),
//                         headers: {
//                             'Content-Type': 'application/json'
//                         }
//                     });
//                     if (response.status === 200) {
//
//                         const user = (await response.json()) as SuccessLoginResponse;
//                         profile.image = user.image;
//                         setJwtAccessToken(user.jwtAccessToken);
//                         setJwtRefreshToken(user.jwtRefreshToken);
//
//                         return true;
//                     }
//                 }
//
//                 return false;
//             } else  if (account?.provider === "credentials") {
//                 // console.log("credentials credentials  credentials credentials credentials credentials credentials credentials credentials")
//                 return true;
//             }else  if (account?.provider === "Magic Link") {
//                 // console.log("credentials credentials  credentials credentials credentials credentials credentials credentials credentials")
//                 console.log(" NULL 2 !!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
//                 return true;
//             }
//             return false;
//         },
//
//
//     }
//
// }
