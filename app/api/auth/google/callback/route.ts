import {google} from "googleapis";
import {NextRequest, NextResponse} from "next/server";
import {env} from "@/env.mjs";
import {setJwtAccessToken, setJwtRefreshToken} from "@/app/(protected)/jwtSessionService/SetHttpOnlyCookies";
import {ResponseTokens} from "@/app/DefaultResponsesInterfaces";


// const APP_URL = env.APP_URL || 'https://e-learn.top';
const APP_URL = env.APP_URL || 'http://localhost:3000';
const CLIENT_ID = env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = env.GOOGLE_SECRET;
const REDIRECT_URL = APP_URL + env.GOOGLE_CALLBACK_URL;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);


export async function GET(req: NextRequest) {

    console.log("pred code!!! ");

    const reqParams = req.nextUrl.searchParams;
    const code = reqParams.get("code") || "";

    console.log("post code");


    try {
        const {tokens} = await oAuth2Client.getToken(code);

        oAuth2Client.setCredentials(tokens);

        const oauth2 = google.oauth2({version: 'v2', auth: oAuth2Client});
        const {data} = await oauth2.userinfo.get();

        console.log("post tokens");
        const formData = {
            email: data.email,
            name: data.name,
        }

        console.log("fetch");

        const response = await fetch(env.SERVER_API_URL + '/api/auth/google', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("fetch next");

        if (response.status === 200) {
            console.log("pred profile");
            const tokens = (await response.json()) as ResponseTokens;
            console.log("profile - - 0")
            console.log("profile 0")
            // const tokens = (await response.json()) as ResponseTokens;
            // setJwtAccessToken(tokens.jwtAccessToken);
            // setJwtRefreshToken(tokens.jwtRefreshToken);
            console.log("profile")

            return NextResponse.redirect(new URL(`/auth?key=${tokens.jwtRefreshToken}`, req.url));
        }

        console.log("login")
        return NextResponse.redirect(new URL('/login', req.url));

    } catch (error) {

        return NextResponse.json(error, {status: 500});
    }
}