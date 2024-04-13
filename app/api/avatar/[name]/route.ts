import {NextRequest, NextResponse} from "next/server";
import { env } from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";

export async function GET(req: NextRequest) {

    const localUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

    const newReqURL = req.url.replace(localUrl, '');

    const res = await fetchWithToken(env.SERVER_API_URL + newReqURL, {
        method: "GET"
    });


    return new Response(res?.body);

}