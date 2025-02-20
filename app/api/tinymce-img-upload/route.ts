import {NextRequest, NextResponse} from "next/server";
import {env} from "@/env.mjs";
import {getJwtAccessToken} from "@/app/(protected)/jwtSessionService/authTokenHandler";
import {blob} from "node:stream/consumers";
import {fetchWithToken} from "@/app/fetchWithToken";

export async function POST(req: NextRequest) {

    const form = await req.formData();

    const img = form.get("file") as File;

    const data = new FormData();
    data.append("imageFile", img as Blob);

    const resp = await fetchWithToken(`${env.SERVER_API_URL}/api/v1/storage/upload/web-img`, {
        method: "POST",
        body: data,
    });

    const imageName = await resp?.text();

    if (resp?.ok) {
        return NextResponse.json({ location: imageName }, { status: 200 });
    }
    return NextResponse.json({}, {status: 400});
}