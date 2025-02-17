'use server'

import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";
import {SimpleWord} from "@/app/(protected)/admin/dictionary-pages/dictionary-page/[uuid]/searchWord";


export async function searchWordToCard(searchTerm: string): Promise<Result<SimpleWord[], string>> {

    try {
        const res = await fetchWithToken(env.SERVER_API_URL + '/api/v1/words/search?searchQuery=' + searchTerm, {
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