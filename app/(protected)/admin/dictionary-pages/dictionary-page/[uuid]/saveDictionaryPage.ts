'use server'

import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";
import {ResponseMessages, SEOObject, SuccessResponse} from "@/app/DefaultResponsesInterfaces";
import {SimpleWord} from "@/app/(protected)/admin/dictionary-pages/dictionary-page/[uuid]/searchWord";
import {DictionaryPage} from "@/app/(protected)/admin/dictionary-pages/dictionary-page/[uuid]/getDictionaryPage";
import {Word} from "@/app/(protected)/admin/words/word/[uuid]/getWordAPI";

export type SaveDictionaryErrors = {
    uuid?: string;
    name?: string;
    description?: string;
    partOfSpeech?: string;
    categoryUUID?: string;
    categoryName?: string;
    wordUUID?: string;
    seoObject?: {
        h1?: string;
        htmlTagTitle?: string;
        htmlTagDescription?: string;
    };
    error?: string;
}

export async function saveDictionaryPage(data: Record<string, any>, uuid: string): Promise<Result<SuccessResponse<DictionaryPage>, SaveDictionaryErrors>> {

    try {
        const res = await fetchWithToken(`${env.SERVER_API_URL}/api/v1/dictionary/${uuid}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
            },
        });

        if (res?.ok) {
            const json = (await  res.json()) as SuccessResponse<DictionaryPage>;
            return { ok: json, err: null };

        }

        if(res?.status === 400 || res?.status === 409) {
            const errors = (await  res.json()) as SaveDictionaryErrors;
            return { ok: null, err: errors };
        }


        return {ok: null, err: {error: "Помилка запиту на сервер, status: " + res?.status}};

    } catch (error) {
        // console.error('Error save Category to  Admin page:', error);
        return {ok: null, err: {error: "Помилка запиту на сервер!"}};
    }

}