import {env} from "@/env.mjs";
import {DictionaryPage} from "@/app/DefaultResponsesInterfaces";


export async function getWords(uuid: string) {

    try {
        const response = await fetch(`${env.SERVER_API_URL}/api/dictionary/pages/category/${uuid}`, {
            method: 'GET',
            cache: 'no-store', next: {}
        });

        return (await response.json()) as DictionaryPage[];

    } catch (error) {

        return undefined;
    }

}