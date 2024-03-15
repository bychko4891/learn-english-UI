import {google} from "googleapis";
import {NextRequest, NextResponse} from "next/server";
import {env} from "@/env.mjs";
import {setJwtAccessToken, setJwtRefreshToken} from "@/app/(protected)/jwtSessionService/SetHttpOnlyCookies";



const NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_SECRET;
const REDIRECT_URL = NEXTAUTH_URL + process.env.GOOGLE_REDIRECT_URL; // Наприклад, http://localhost:3000/api/auth/google/callback


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
        // console.error('Error retrieving access token:', error);
        // res.status(500).json({ error: 'Internal server error' });
        return NextResponse.json(error, {status: 500});
    }
    // } else {
    //     res.setHeader('Allow', ['GET', 'POST']);
    //     res.status(405).end(`Method ${req.method} Not Allowed`);
    // }
// }
}