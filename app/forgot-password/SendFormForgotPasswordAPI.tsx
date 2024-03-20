'use server'

import {env} from "@/env.mjs";
import {BadRequestMessages, GeneralMessage} from "@/app/DefaultResponsesInterfaces";

type DataSend = {
    email: string;
}

export async function SendFormForgotPasswordAPI(data: DataSend) {

    console.log(" API Forgot password")

    const response =  await fetch(env.SERVER_API_URL + '/api/forgot-password', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const success = (await response.json()) as GeneralMessage;
        success.status = 200;
        return success;
    }
    if (response.status === 400) {
        const badRequest = (await response.json()) as BadRequestMessages
        badRequest.status = 400;
        return badRequest;
    }
    if (response.status === 404) {
        const forbidden = (await response.json()) as GeneralMessage;
        forbidden.status = 404;
        return forbidden;
    }
    //
    // const  res = (await response.json()) as GeneralMessage
    return response;
}