import {google} from "googleapis";
import {NextRequest, NextResponse} from "next/server";
import {redirect} from "next/navigation";


const NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_SECRET;
const REDIRECT_URL = NEXTAUTH_URL + process.env.GOOGLE_REDIRECT_URL; // Наприклад, http://localhost:3000/api/auth/google/callback


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
export async function GET(req: NextRequest, res: NextResponse) {

    const  reqParams   = req.nextUrl.searchParams;
    const code = reqParams.get("code") || "";

    console.log(code + " code **********************************")

    try {
        const { tokens } = await oAuth2Client.getToken(code);

        oAuth2Client.setCredentials(tokens);

        const oauth2 = google.oauth2({ version: 'v2', auth: oAuth2Client });
        const { data } = await oauth2.userinfo.get();

        // return NextResponse.json(data, {status: 200});
        return NextResponse.redirect("/about", 307);
        // redirect("/about");
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