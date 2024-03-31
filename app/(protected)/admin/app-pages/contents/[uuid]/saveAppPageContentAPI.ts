'use server'

import {env} from "@/env.mjs";
import {getJwtAccessToken} from "@/app/(protected)/jwtSessionService/authTokenHandler";
import {AppPageContent, GeneralMessage} from "@/app/DefaultResponsesInterfaces";
import {fetchWithToken} from "@/app/fetchWithToken";


export async function saveAppPageContentAPI(data:FormData, uuid: string) {

    const token = await getJwtAccessToken();

    try {
        const response = await fetchWithToken(env.SERVER_API_URL + '/api/admin/app-pages-contents/page-content/' + uuid, {
            method: 'PUT',
            body: data,
        });

        if (!response?.ok) {
            throw new Error('Network response was not ok');
        }
        const message = (await  response.json()) as GeneralMessage;
        message.status = 200;

        return message;
    } catch (error) {
        console.error('Error fetching data App content page to  Admin page:', error);
        // Обробка помилки, якщо запит не вдалося виконати
    }

}