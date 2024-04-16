'use server'

import {env} from "@/env.mjs";
import {ResponseMessages} from "@/app/DefaultResponsesInterfaces";

type DataSend = {
    email: string;
}

export async function SendFormForgotPasswordAPI(data: DataSend) {

    try {
        const response = await fetch(env.SERVER_API_URL + '/api/forgot-password', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const success = (await response.json()) as ResponseMessages;
            success.status = 200;
            return success;
        }
        if (response.status === 400) {
            const badRequest = (await response.json()) as ResponseMessages
            badRequest.status = 400;
            return badRequest;
        }
        if (response.status === 404) {
            const forbidden = (await response.json()) as ResponseMessages;
            forbidden.status = 404;
            return forbidden;
        }
        return undefined;
    } catch (error) {
        return undefined;
    }

}