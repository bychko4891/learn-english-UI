'use server'

import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";

type ResMessage = {
    status: number;
    h1: string;
    htmlTagDescription: string,
    htmlTagTitle: string,
    general: string;

}

export async function saveArticleAPI(data:FormData, uuid: string) {


    try {
        const response = await fetchWithToken(env.SERVER_API_URL + '/api/admin/article/' + uuid, {
            method: 'PUT',
            body: data,
        });

        if(response?.status === 400) {
            const message = (await  response.json()) as ResMessage;
            message.status = 400;
            return message;
        }

        if (!response?.ok) {
            throw new Error('Network response was not ok');
        }
        const message = (await  response.json()) as ResMessage;
        message.status = 200;

        return message;
    } catch (error) {
        // console.error('Error save Category to  Admin page:', error);
        return undefined;
    }

}