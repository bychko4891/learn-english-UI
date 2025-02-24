'use server'

import {cookies} from "next/headers";
import {JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN} from "@/CookiesName";
import { env } from "@/env.mjs";
import {ResponseTokens} from "@/app/DefaultResponsesInterfaces";


export async function getJwtAccessToken(): Promise<string | undefined> {
    const accessToken = cookies().get(JWT_ACCESS_TOKEN);
    if (accessToken && accessToken.value) {

        return accessToken.value;
    }
    return undefined;
}

export async function getJwtRefreshToken(): Promise<string | undefined> {
    const accessToken = cookies().get(JWT_REFRESH_TOKEN);
    if (accessToken && accessToken.value) {

        return accessToken.value;
    }
    return undefined;
}

export async function regenerateAccessToken(refreshToken: string,): Promise<string | undefined> {
    try {
        const response = await fetch(env.SERVER_API_URL + '/api/v1/auth/update/access-token', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken: refreshToken }),
        });

        if(response.status === 200) {
            const json = (await response.json()) as ResponseTokens;
            return json.accessJwtToken;
        } if(response.status === 401) {
            return undefined;
        }

    } catch (error) {
        return undefined;
    }
    return undefined;
}

export async function regenerateAllTokens(refreshToken: string,): Promise<ResponseTokens | undefined> {
    try {

        const response = await fetch(env.SERVER_API_URL + '/api/v1/auth/update/refresh-token', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({refreshToken: refreshToken}),
        });

        return (await response.json()) as ResponseTokens;

    } catch (error) {
        return undefined;
    }

    return undefined;
}