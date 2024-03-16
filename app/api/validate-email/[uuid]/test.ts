// import {NextRequest, NextResponse} from "next/server";
// import { getServerSession } from "next-auth/next";
// import {NextApiRequest, NextApiResponse} from "next";
// import { env } from "@/env.mjs";
// import {signIn} from "next-auth/react";
//
//
// type SuccessResponse = {
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
//
// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//
//     const localUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
//     const url = req.url;
//     const apiUrl = url?.replace(localUrl, "")
//     const parts = apiUrl?.split('/') || "";
//
//     // Беремо останній елемент масиву, який буде UUID
//     const uuid = parts[parts.length - 1];
//
//
//     const resp = await fetch(env.SERVER_API_URL + '/api/find-user/' + uuid, {
//         method: "GET",
//     });
//
//     if (resp.status === 200) {
//     //     const user = (await resp.json()) as SuccessResponse;
//         // const session = await getServerSession(req, res, {
//         //     user: { id: user.id, email: user.name  }, useSecureCookies: true
//         // });
//         // const session = await getServerSession({ req, res });
//         await signIn("Magic Link", { didToken: parts, req});
//         // Встановлюємо токени аутентифікації у сесію
//         // const session = await getServerSession(req, res, {
//         //     user: { id: user.id, email: user.name }, useSecureCookies: true
//         // });
//         // Встановлюємо редірект
//
//         // NextResponse.redirect("http://localhost:3000/user/profile");
//     }
//
//
//     return new Response(resp.body);
//     // return resp;
// }

import { NextApiRequest, NextApiResponse } from 'next';
import {env} from "@/env.mjs";
import {setJwtAccessToken, setJwtRefreshToken} from "@/app/(protected)/jwtSessionService/SetHttpOnlyCookies";
import {NextRequest, NextResponse} from "next/server";

type SuccessResponse = {

    jwtAccessToken: string;

    jwtRefreshToken: string;

    id: string;

    name: string;

    image: string;
};

export async function handler(req: NextApiRequest, res: NextApiResponse) {

    const localUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

    const url = req.url;

    const apiUrl = url?.replace(localUrl, "")



    const response = await fetch(env.SERVER_API_URL + apiUrl, {
        method: "GET",
    });

 if(response.ok){

     const user = (await response.json()) as SuccessResponse;

     setJwtAccessToken(user.jwtAccessToken);
     setJwtRefreshToken(user.jwtRefreshToken);

    // const { id, email, name, image } = req.body;


    const account = {provider: "Magic Link"}
    // await signIn("Magic Link", {account,  user});

    // res.status(200).json({ success: true, message: 'Session created successfully' });
    res.redirect("/user/profile");
 }
 return res;

}