import {NextApiRequest, NextApiResponse} from "next";
import {google} from "googleapis";


const NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_SECRET;
const REDIRECT_URL = NEXTAUTH_URL + process.env.GOOGLE_REDIRECT_URL; // Наприклад, http://localhost:3000/api/auth/google/callback


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
export async function POST(req: NextApiRequest, res: NextApiResponse) {

    console.log(" callback ")
    const { code } = req.body;
    console.log(code + " CODE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

    try {
        // Отримуємо доступний токен після успішної аутентифікації
        const { tokens } = await oAuth2Client.getToken(code);

        // Встановлюємо токен для подальшого використання
        oAuth2Client.setCredentials(tokens);

        // Отримуємо інформацію про користувача
        const oauth2 = google.oauth2({ version: 'v2', auth: oAuth2Client });
        const { data } = await oauth2.userinfo.get();

        // Відправляємо інформацію про користувача у відповідь
        res.status(200).json(data);
    } catch (error) {
        console.error('Error retrieving access token:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    // } else {
    //     res.setHeader('Allow', ['GET', 'POST']);
    //     res.status(405).end(`Method ${req.method} Not Allowed`);
    // }
// }
}