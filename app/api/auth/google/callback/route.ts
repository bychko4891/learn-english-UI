import {google} from "googleapis";
import {NextRequest, NextResponse} from "next/server";
import {env} from "@/env.mjs";
import {setJwtAccessToken, setJwtRefreshToken} from "@/app/(protected)/jwtSessionService/SetHttpOnlyCookies";



const APP_URL = env.APP_URL || 'http://localhost:3000';
const CLIENT_ID = env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = env.GOOGLE_SECRET;
const REDIRECT_URL = APP_URL + env.GOOGLE_CALLBACK_URL;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

type SuccessApiLoginResponse = {

    jwtAccessToken: string;

    jwtRefreshToken: string;

};

export async function GET(req: NextRequest, res: NextResponse) {

    const reqParams = req.nextUrl.searchParams;
    const code = reqParams.get("code") || "";


    try {
        const {tokens} = await oAuth2Client.getToken(code);

        oAuth2Client.setCredentials(tokens);

        const oauth2 = google.oauth2({version: 'v2', auth: oAuth2Client});
        const {data} = await oauth2.userinfo.get();

        const formData = {
            email: data.email,
            name: data.name,
        }

        const response = await fetch(env.SERVER_API_URL + '/api/auth/google', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            const tokens = (await response.json()) as SuccessApiLoginResponse;
            setJwtAccessToken(tokens.jwtAccessToken);
            setJwtRefreshToken(tokens.jwtRefreshToken);

            return NextResponse.redirect(new URL("/user/profile", req.url));

        }

        return NextResponse.redirect(new URL('/login', req.url));

    } catch (error) {

        return NextResponse.json(error, {status: 500});
    }
    // } else {
    //     res.setHeader('Allow', ['GET', 'POST']);
    //     res.status(405).end(`Method ${req.method} Not Allowed`);
    // }
// }
}