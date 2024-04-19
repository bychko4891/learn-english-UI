'use server'

import {env} from "@/env.mjs";
import {DictionaryPage, EntityAndMainCategoriesResp} from "@/app/DefaultResponsesInterfaces";
import {fetchWithToken} from "@/app/fetchWithToken";


export async function getDictionaryPageAPI(uuid: string) {


    try {
        const response = await fetchWithToken(env.SERVER_API_URL + '/api/admin/dictionary-page/' + uuid, {
            method: 'GET',
        });


        if (!response?.ok) {
            throw new Error('Network response was not ok');
        }


        return (await response.json()) as EntityAndMainCategoriesResp<DictionaryPage>;
    } catch (error) {
        // console.error('Error fetching get data Category to  Admin page:', error);
        return undefined;
    }

}