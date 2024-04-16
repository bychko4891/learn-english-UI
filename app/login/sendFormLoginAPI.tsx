'use server'

import {env} from "@/env.mjs";
import {setJwtAccessToken, setJwtRefreshToken} from "@/app/(protected)/jwtSessionService/SetHttpOnlyCookies";
import {redirect} from "next/navigation";
import {ResponseMessages, ResponseTokens} from "@/app/DefaultResponsesInterfaces";

type DataSend = {
    email: string;
    password: string;
}

export async function sendFormLoginAPI(data: DataSend) {


    const response = await fetch(env.SERVER_API_URL + '/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    if (response.status === 200) {
        const tokens = (await response.json()) as ResponseTokens;
        setJwtAccessToken(tokens.jwtAccessToken);
        setJwtRefreshToken(tokens.jwtRefreshToken);
        redirect('/user/profile');
    }
    if (response.status === 401 || response.status === 400) {

        return (await response.json()) as ResponseMessages
    }
}