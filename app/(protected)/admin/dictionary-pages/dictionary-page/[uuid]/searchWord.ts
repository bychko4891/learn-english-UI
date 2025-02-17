'use server'

import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";

export type SimpleWord = {
    uuid: string;
    name: string;
}

export async function searchWord(searchTerm: string, searchTo: string): Promise<Result<SimpleWord[], string>> {


    try {
        const res = await fetchWithToken(`${env.SERVER_API_URL}/api/v1/${searchTo === "lesson" ? "words" : "word"}/search/admin?searchQuery=${searchTerm}`, {
            method: 'GET',
        });

        if(res?.ok) {
            const json = (await res.json()) as SimpleWord[];
            return {ok: json, err: null}
        }

        console.log(await res?.text())
        return {ok: null, err: "filed to fetch search word"};

    } catch (error) {
        console.error('filed to fetch search word:', error);
        return {ok: null, err: "filed to fetch search word"};
    }

}