'use server'

import {env} from "@/env.mjs";
import {setJwtAccessToken, setJwtRefreshToken} from "@/app/(protected)/jwtSessionService/SetHttpOnlyCookies";
import {redirect} from "next/navigation";
import {ResponseMessages, ResponseTokens} from "@/app/DefaultResponsesInterfaces";
import {getJwtAccessToken} from "@/app/(protected)/jwtSessionService/authTokenHandler";

type DataSend = {
    email: string;
    password: string;
}

export async function sendAdminFormLoginAPI(data: DataSend): Promise<Result<string, ResponseMessages>> {

    try {
        const response = await fetch(env.SERVER_API_URL + '/api/v1/auth/admin/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            const tokens = (await response.json()) as ResponseTokens;
            if (tokens.role === "ADMIN") {
                setJwtAccessToken(tokens.accessJwtToken);
                setJwtRefreshToken(tokens.refreshJwtToken);
                return {ok: tokens.role, status: 200, err: null}
                // redirect('/admin');
            }
        }
        if (response.status === 401 || response.status === 400) {

            return {ok: null, status: 400, err: (await response.json()) as ResponseMessages}
        }
        return {ok: null, status: 500, err: {general :"failed to fatch cancel reason"} as ResponseMessages};
    } catch (e) {
        console.error(e);
        return { ok: null, status: 500, err: {general :"failed to fatch cancel reason"} as ResponseMessages };
    }
}