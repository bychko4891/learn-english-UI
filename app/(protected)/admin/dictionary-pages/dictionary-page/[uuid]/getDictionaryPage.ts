'use server'

import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";
import { SEOObject } from "@/app/DefaultResponsesInterfaces";
import {Word} from "@/app/(protected)/admin/words/word/[uuid]/getWordAPI";

export type DictionaryPage = {
    uuid: string;
    name: string;
    description: string;
    partOfSpeech: string;
    published: boolean;
    categoryUUID: string;
    categoryName: string;
    word: Word;
    seoObject: SEOObject;
}

export async function getDictionaryPage(uuid: string) {

    try {
        const response = await fetchWithToken(`${env.SERVER_API_URL}/api/v1/dictionary/${uuid}/admin`, {
            method: 'GET',
        });


        if (!response?.ok) {
            throw new Error('Network response was not ok');
        }


        return (await response.json()) as DictionaryPage;
    } catch (error) {
        // console.error('Error fetching get data Category to  Admin page:', error);
        return undefined;
    }

}