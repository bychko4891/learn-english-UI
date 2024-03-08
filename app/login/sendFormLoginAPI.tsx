'use server'

import {env} from "@/env.mjs";
import {setJwtAccessToken, setJwtRefreshToken} from "@/app/(protected)/jwtSessionService/SetHttpOnlyCookies";
import {redirect} from "next/navigation";

type FormDataResponse = {
    email: string;
    password: string;
}

type UnauthorizedLoginResponse = {
    status: string;
    fieldName: string;
    fieldMessage: string;
};

type SuccessLoginResponse = {
    type: "Bearer";
    jwtAccessToken: string;
    jwtRefreshToken: string;
};
export async function sendFormLoginAPI(formData: FormDataResponse) {

    const response = await fetch(env.SERVER_API_URL + '/auth/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    if (response.status === 200) {
        const tokens = (await response.json()) as SuccessLoginResponse;
        setJwtAccessToken(tokens.jwtAccessToken);
        setJwtRefreshToken(tokens.jwtRefreshToken);
        redirect('/about');
    }
    if (response.status === 401) {
        return await response.json() as UnauthorizedLoginResponse
    }
}