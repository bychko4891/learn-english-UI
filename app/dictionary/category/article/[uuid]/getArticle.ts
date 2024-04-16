import {env} from "@/env.mjs";
import {Article} from "@/app/DefaultResponsesInterfaces";


export async function getArticle(uuid: string) {

    try {
        const response = await fetch(`${env.SERVER_API_URL}/api/article/${uuid}`, {
            method: 'GET',
            cache: 'no-store', next: {}
        });

        if (response.ok) {
            return (await response.json()) as Article;
        }

        return undefined;

    } catch (error) {

        return undefined;
    }

}