'use server'

import {env} from "@/env.mjs";
import {ResponseMessages} from "@/app/DefaultResponsesInterfaces";
import {fetchWithToken} from "@/app/fetchWithToken";


export async function saveWordLessonAPI(data:FormData, uuid: string) {

    try {
        const response = await fetchWithToken(env.SERVER_API_URL + '/api/admin/word/' + uuid, {
            method: 'PUT',
            body: data,
        });

        // console.log(await response?.json())

        if (response?.ok) {
            const message = (await  response.json()) as ResponseMessages;
            message.status = 200;
            return message;
        }

        if (response?.status === 400) {
            console.log("400 !!! !!!")
            const message = (await  response.json()) as ResponseMessages;
            message.status = 400;
            return message;
        }

        return undefined;
    } catch (error) {
        // console.error('Error fetching data App content page to  Admin page:', error);
        return undefined;
    }

}