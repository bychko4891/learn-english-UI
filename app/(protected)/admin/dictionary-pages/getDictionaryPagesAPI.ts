'use server'

import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";
import {DictionaryPage, PaginationObject} from "@/app/DefaultResponsesInterfaces";


export async function getDictionaryPagesAPI() {

    try {
        const response = await fetchWithToken(`${env.SERVER_API_URL}/api/admin/dictionary-pages`, {
            method: 'GET',
        });

        if (response?.ok) {
            return (await response.json()) as PaginationObject<DictionaryPage>;
            // throw new Error('Network response was not ok');
        }

        if(response?.status === 400) {
            console.log("44444444444444444444444444")
        }
        throw new Error('Network response was not ok');

    } catch (error) {
        // console.error('Error fetching data Categories to  Admin page:', error);
        return undefined;
    }

}