'use server'

import {env} from "@/env.mjs";
import {DictionaryPage, Word} from "@/app/DefaultResponsesInterfaces";
import {fetchWithToken} from "@/app/fetchWithToken";


export async function getWordsForUserSearchAPI(searchTerm: string) {

    try {
        const response = await fetch(env.SERVER_API_URL + '/api/search/dictionary-pages?searchTerm=' + searchTerm, {
            method: 'GET',
        });


        if (response?.ok) {
            return (await response.json()) as DictionaryPage[];
        }

        throw new Error('Network response was not ok');

    } catch (error) {
        // console.error('Error fetching get data Category to  Admin page:', error);
        return undefined;
    }

}