import {env} from "@/env.mjs";
import {DictionaryPage} from "@/app/DefaultResponsesInterfaces";


export async function getWord(name: string) {

    try {
        const response = await fetch(`${env.SERVER_API_URL}/api/dictionary-page/${name}`, {
            method: 'GET',
            cache: 'no-store', next: {}
            // cache: 'force-cache', next: {}
        });

        return (await response.json()) as DictionaryPage;

    } catch (error) {

        return undefined;
    }

}