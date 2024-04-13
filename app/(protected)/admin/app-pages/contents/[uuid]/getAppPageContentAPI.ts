'use server'

import {env} from "@/env.mjs";
import {getJwtAccessToken} from "@/app/(protected)/jwtSessionService/authTokenHandler";
import {AppPageContentRequest} from "@/app/DefaultResponsesInterfaces";


export async function getAppPageContentAPI(uuid: string) {

    const token = await getJwtAccessToken();

    try {
        const response = await fetch(env.SERVER_API_URL + '/api/admin/app-pages-contents/page-content/' + uuid, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });


        if (response.ok) {
            return (await response.json()) as AppPageContentRequest;
            // throw new Error('Network response was not ok');
        }
        // console.log(JSON.stringify(response));
        // const s = (await response.json()) as AppPageContentRequest;
        // console.log(s.applicationPageContent.description + " descr!!!!!! !!!!");

        return undefined;
    } catch (error) {
        // console.error('Error fetching get data Category to  Admin page:', error);
        // Обробка помилки, якщо запит не вдалося виконати
        return undefined;
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