'use server'

import {env} from "@/env.mjs";
import {GeneralMessage} from "@/app/DefaultResponsesInterfaces";
import {fetchWithToken} from "@/app/fetchWithToken";


export async function saveWordAPI(data:FormData, uuid: string) {


    try {
        const response = await fetchWithToken(env.SERVER_API_URL + '/api/admin/word' + uuid, {
            method: 'PUT',
            body: data,
        });

        if (response?.ok) {
            const message = (await  response.json()) as GeneralMessage;
            message.status = 200;
            // throw new Error('Network response was not ok');
        }

        if (response?.status === 400) {
            const message = (await  response.json()) as GeneralMessage;
            message.status = 400;
            // throw new Error('Network response was not ok');
        }

        return undefined;
    } catch (error) {
        console.error('Error fetching data App content page to  Admin page:', error);
        // Обробка помилки, якщо запит не вдалося виконати
    }

}