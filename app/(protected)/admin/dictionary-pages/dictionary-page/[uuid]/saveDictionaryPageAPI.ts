'use server'

import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";
import {ResponseMessages} from "@/app/DefaultResponsesInterfaces";

export async function saveDictionaryPageAPI(data:FormData, uuid: string) {


    try {
        const response = await fetchWithToken(env.SERVER_API_URL + '/api/admin/dictionary-page/' + uuid, {
            method: 'PUT',
            body: data,
        });

        if (response?.ok) {
            const message = (await  response.json()) as ResponseMessages;
            message.status = 200;

            return message;

        }

        if(response?.status === 400) {
            const message = (await  response.json()) as ResponseMessages;
            message.status = 400;
            return message;
        }


        return undefined;
    } catch (error) {
        // console.error('Error save Category to  Admin page:', error);
        return undefined;
    }

}