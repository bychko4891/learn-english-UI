'use server'

import {env} from "@/env.mjs";
import {SuccessResponse} from "@/app/DefaultResponsesInterfaces";
import {fetchWithToken} from "@/app/fetchWithToken";
import {Word} from "@/app/(protected)/admin/words/word/[uuid]/getWordAPI";

export type SaveWordError = {
    uuid?: string;
    name?: string;
    translate?: string;
    brTranscription?: string;
    usaTranscription?: string;
    irregularVerbPt?: string;
    irregularVerbPp?: string;
    wordLevel?: string;
    image?: {storageId?: string};
    audio?: {storageId?: string};
    error?: string;
}

export async function saveWord(data:FormData, uuid: string): Promise<Result<SuccessResponse<Word>, SaveWordError>>  {

    try {
        const res = await fetchWithToken(`${env.SERVER_API_URL}/api/v1/word/${uuid}`, {
            method: 'PUT',
            body: data,
        });

        if (res?.ok) {
            const json = (await  res.json()) as SuccessResponse<Word>;
            return { ok: json, err: null };

        }

        if(res?.status === 400 || res?.status === 409 || res?.status === 503) {
            const errors = (await  res.json()) as SaveWordError;
            return { ok: null, err: errors };
        }


        return {ok: null, err: {error: "Помилка запиту на сервер, status: " + res?.status}};

    } catch (error) {
        // console.error('Error save Category to  Admin page:', error);
        return {ok: null, err: {error: "Помилка запиту на сервер!"}};
    }

}