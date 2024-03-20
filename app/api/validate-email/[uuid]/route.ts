import {env} from "@/env.mjs";
import {NextRequest, NextResponse} from "next/server";
import {GeneralMessage, ResponseTokens} from "@/app/DefaultResponsesInterfaces";


export async function GET(req: NextRequest) {

    const localUrl = env.APP_URL || 'http://localhost:3000';

    const url = req.url;

    const apiUrl = url?.replace(localUrl, "");

    try {
        const response = await fetch(env.SERVER_API_URL + apiUrl, {
            method: "GET",
        });

        if (response.ok) {

            const tokens = (await response.json()) as ResponseTokens;

            return NextResponse.json({tokens}, {status: 200});
        }

        const badResponse = (await response.json()) as GeneralMessage;

        return NextResponse.json({badResponse}, {status: 400});

    } catch (error) {
        return NextResponse.json({"Server error! Validate email fail: ": error}, {status: 500});
    }
}