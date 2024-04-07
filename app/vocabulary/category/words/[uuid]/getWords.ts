import {env} from "@/env.mjs";
import {CategoryResponse, VocabularyPage} from "@/app/DefaultResponsesInterfaces";


export async function getWords(uuid: string) {

    try {
        const response = await fetch(`${env.SERVER_API_URL}/api/vocabulary/pages/category/${uuid}`, {
            method: 'GET',
            cache: 'no-store', next: {}
        });

        return (await response.json()) as VocabularyPage[];

    } catch (error) {

        return undefined;
    }

}