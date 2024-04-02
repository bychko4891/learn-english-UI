'use server'

import {env} from "@/env.mjs";
import {getJwtAccessToken} from "@/app/(protected)/jwtSessionService/authTokenHandler";
import {AppPage} from "@/app/DefaultResponsesInterfaces";


export async function getAppPageByUrl(url: string) {

    // try {
        return await fetch(env.SERVER_API_URL + `/api/page/${url}`, {
            method: 'GET'
        });

    //     if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //     }
    //
    //     // if(!data) {
    //     const page = (await response.json()) as AppPage;
    //     return page;
    //     // }
    // } catch (error) {
    //     console.error('Error fetching data ABOUT:', error);
    //     // Обробка помилки, якщо запит не вдалося виконати
    // }

}