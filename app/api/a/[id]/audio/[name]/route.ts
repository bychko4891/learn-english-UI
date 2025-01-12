import {NextRequest, NextResponse} from "next/server";
import { env } from "@/env.mjs";

export async function GET(req: NextRequest) {

    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    const localUrl = `${req.nextUrl.protocol}//${req.nextUrl.host}/api/a`;

    const newReqURL = "/api/v1/storage" + req.url.replace(localUrl, '');
    console.log("-->> "+newReqURL)

    const res = await fetch(env.SERVER_API_URL + newReqURL, {
        method: "GET"
    });
console.log("STATUS ---->>>> " + res.status)

    return new Response(res.body);

}