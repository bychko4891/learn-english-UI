import { google, oauth2_v2 } from 'googleapis';
import {NextRequest, NextResponse} from "next/server";


const NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_SECRET;
const REDIRECT_URL = NEXTAUTH_URL + process.env.GOOGLE_REDIRECT_URL; // Наприклад, http://localhost:3000/api/auth/google/callback


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

export async function GET(req: NextRequest) {

    console.log("GOOGLE step one !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
        });
            console.log(authUrl + " auth url !!!")


    const url = {url: authUrl}
        // Повертаємо URL для перенаправлення
        // res.json({authUrl});
    return NextResponse.json({url: authUrl}, {status: 200});
}
