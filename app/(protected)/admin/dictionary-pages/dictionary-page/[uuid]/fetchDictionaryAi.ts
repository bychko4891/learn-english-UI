'use server'

import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";


export async function fetchDictionaryAi(field: string, word: string): Promise<Result<string, string>> {

    try {
        const response = await fetch(`${env.SERVER_API_URL}/api/v1/gemini/dictionary-to-gemini?field=${field}&word=${word}`, {
        // const response = await fetchWithToken(`${env.SERVER_API_URL}/api/v1/gemini/word-to-gemini?wordField=${wordField}&word=${word}`, {
            method: 'POST',
        });

        if (response?.ok) {
            const text = await response.text();
            return {ok: text, err: null}
        }

        return {ok: null, err: ""};

    } catch (error) {
        // console.error('Error fetching get data Category to  Admin page:', error);
        return {ok: null, err: ""};
    }

}