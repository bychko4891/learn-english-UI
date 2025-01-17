'use server'

import {env} from "@/env.mjs";
import {DictionaryPage, Word} from "@/app/DefaultResponsesInterfaces";
import {fetchWithToken} from "@/app/fetchWithToken";


export async function fetchSearchWordToCardAPI(searchTerm: string) {

    try {
        const response = await fetchWithToken(env.SERVER_API_URL + '/api/v1/words/search?searchQuery=' + searchTerm, {
            method: 'GET',
        });

        // console.log(await response?.json() as Word[]);

        if (!response?.ok) {
            throw new Error('Network response was not ok');
        }

        return (await response.json()) as Word[];

    } catch (error) {
        // console.error('Error fetching get data Category to  Admin page:', error);
        return undefined;
    }

}