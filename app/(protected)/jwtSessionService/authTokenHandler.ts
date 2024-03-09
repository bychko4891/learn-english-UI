import {cookies} from "next/headers";
import {JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN} from "@/CooKiesName";
import {redirect} from "next/navigation";
import { env } from "@/env.mjs";


export type SuccessAccessTokenRegeneration = {
    type: "Bearer";
    jwtAccessToken: string;
    jwtRefreshToken: string;
};

export async function getJwtAccessToken(): Promise<string | undefined> {
    const accessToken = cookies().get(JWT_ACCESS_TOKEN);
    if (accessToken && accessToken.value) {

        return accessToken.value;
    }
    return undefined;
}

export async function regenerateAccessToken(
    refreshToken: string,
): Promise<string | undefined> {
    const response = await fetch(env.SERVER_API_URL + '/api/auth/refresh/access-token', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ jwtRefreshToken: refreshToken }),
    });

    if(response.status === 200) {
        const json = (await response.json()) as SuccessAccessTokenRegeneration;
        return json.jwtAccessToken;
    } if(response.status === 401) {
        return undefined;
    }
    return undefined;
}

export async function regenerateAllTokens(
    refreshToken: string,
): Promise<SuccessAccessTokenRegeneration> {
    const response = await fetch(env.SERVER_API_URL + '/api/auth/refresh/refresh-token', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ jwtRefreshToken: refreshToken }),
    });

    return (await response.json()) as SuccessAccessTokenRegeneration;
}

export async function redirectUnauthorized() {
    redirect('/login');
}
