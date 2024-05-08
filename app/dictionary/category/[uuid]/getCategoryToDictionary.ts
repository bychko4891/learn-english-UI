import {env} from "@/env.mjs";
import {Article, CategoryResponse} from "@/app/DefaultResponsesInterfaces";


export async function getCategoryToDictionary(uuid: string) {

    try {
        const response = await fetch(`${env.SERVER_API_URL}/api/dictionary/category/${uuid}`, {
            method: 'GET',
            cache: 'no-store', next: {}
        });

        return (await response.json()) as CategoryResponse<Article>;

    } catch (error) {

        return undefined;
    }

}