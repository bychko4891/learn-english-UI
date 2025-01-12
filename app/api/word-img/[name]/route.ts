import {NextRequest, NextResponse} from "next/server";
import { env } from "@/env.mjs";

export async function GET(req: NextRequest) {

    const localUrl = `${req.nextUrl.protocol}//${req.nextUrl.host}/api`;

    const newReqURL = req.url.replace(localUrl, '');

    const res = await fetch(env.SERVER_API_URL + newReqURL, {
        method: "GET"
    });


    return new Response(res.body);



    // const localUrl = `${req.nextUrl.protocol}//${req.nextUrl.host}/api`;
    // const newReqURL = req.url.replace(localUrl, '');
    //
    // const res = await fetch(env.NEXT_PUBLIC_SERVER_URL + newReqURL, {
    //     method: 'GET',
    // });
    //
    //
    // if (!res.ok) {
    //     return new Response('Failed to fetch image', { status: res.status });
    // }
    //
    // const headers = new Headers(res.headers);
    //
    // if (!headers.has('Content-Type')) {
    //     headers.set('Content-Type', 'application/octet-stream');
    // }
    //
    // headers.set('Content-Disposition', res.headers.get('Content-Disposition') || 'inline');
    // headers.set('Cache-Control', res.headers.get('Cache-Control') || 'no-cache');
    // headers.delete("Content-Encoding");
    //
    // return new Response(res.body, { status: res.status, headers, });


}