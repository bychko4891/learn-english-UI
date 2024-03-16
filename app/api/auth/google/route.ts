import { google, oauth2_v2} from 'googleapis';
import {NextRequest, NextResponse} from "next/server";
import { env } from "@/env.mjs";


const APP_URL = env.APP_URL || 'http://localhost:3000';
const CLIENT_ID = env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = env.GOOGLE_SECRET;
const REDIRECT_URL = APP_URL + env.GOOGLE_CALLBACK_URL;


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

export async function GET(req: NextRequest) {

    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
    });

    return NextResponse.json({url: authUrl}, {status: 200});
}
