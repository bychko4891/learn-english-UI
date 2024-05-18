'use server'

import {env} from "@/env.mjs";
import {ResponseMessages, WordLesson} from "@/app/DefaultResponsesInterfaces";
import {fetchWithToken} from "@/app/fetchWithToken";


export async function saveWordLessonAPI(data:WordLesson, uuid: string) {

    try {
            const response = await fetchWithToken(`${env.SERVER_API_URL}/api/admin/word-lesson/${uuid}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
        });


        if (response?.ok) {
            const message = (await  response.json()) as ResponseMessages;
            message.status = 200;
            return message;
        }

        if (response?.status === 400) {
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