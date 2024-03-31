'use server'

import {env} from "@/env.mjs";
import {AppPage, GeneralMessage} from "@/app/DefaultResponsesInterfaces";
import {fetchWithToken} from "@/app/fetchWithToken";

type ResMessage = {
    status: number;
    htmlTagDescription: string,
    htmlTagTitle: string,
    url: string;
    general: string;

}

export async function saveAppPageAPI(appPage: AppPage, uuid: string) {

    console.log("saveAppPageAPI")

    try {
        const response = await fetchWithToken(env.SERVER_API_URL + `/api/admin/app-pages/page/${uuid}`, {
            method: 'PUT',
            body: JSON.stringify(appPage),
            headers: {
                "Content-Type": "application/json",
            },
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
        console.error('Error fetching data App content page to  Admin page:', error);
        // Обробка помилки, якщо запит не вдалося виконати
    }

}