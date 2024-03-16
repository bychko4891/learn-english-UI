'use server'

import {env} from "@/env.mjs";
import {setJwtAccessToken, setJwtRefreshToken} from "@/app/(protected)/jwtSessionService/SetHttpOnlyCookies";
import {redirect} from "next/navigation";

type DataRequest = {
    email: string;
    password: string;
}

export type UnauthorizedLoginResponse = {
    email: string;
    password: string;
    general: string;
};

type SuccessLoginResponse = {
    type: "Bearer";
    jwtAccessToken: string;
    jwtRefreshToken: string;
};
export async function sendFormLoginAPI(data: DataRequest) {


    const response = await fetch(env.SERVER_API_URL + '/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    if (response.status === 200) {
        const tokens = (await response.json()) as SuccessLoginResponse;
        setJwtAccessToken(tokens.jwtAccessToken);
        setJwtRefreshToken(tokens.jwtRefreshToken);
        redirect('/user/profile');
    }
    if (response.status === 401 || response.status === 400) {

        return (await response.json()) as UnauthorizedLoginResponse;
    }
}