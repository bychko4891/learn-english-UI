'use server'

import {env} from "@/env.mjs";
import {AppPage} from "@/app/DefaultResponsesInterfaces";
import {fetchWithToken} from "@/app/fetchWithToken";


export async function getAppPageAPI(uuid: string) {

    try {
        const response = await fetchWithToken(env.SERVER_API_URL + `/api/admin/app-pages/page/${uuid}`, {
            method: 'GET',
        });

        if (!response?.ok) {
            throw new Error('Network response was not ok');
        }


        return (await response.json()) as AppPage;
    } catch (error) {
        console.error('Error fetching get data Category to  Admin page:', error);
        // Обробка помилки, якщо запит не вдалося виконати
    }

}

// export async function getAppPageContentAPI(uuid: string) {
//
//     const token = await getJwtAccessToken();
//
//     try {
//         const response = await fetch(env.SERVER_API_URL + '/api/admin/app-pages-contents/page-content/' + uuid, {
//             method: 'GET',
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             }
//         });
//
//
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//
//
//         return (await response.json()) as AppPageContentRequest;
//     } catch (error) {
//         console.error('Error fetching get data Category to  Admin page:', error);
//         // Обробка помилки, якщо запит не вдалося виконати
//     }
//
// }