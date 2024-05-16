import {env} from "@/env.mjs";
import {Category} from "@/app/DefaultResponsesInterfaces";


export async function getCategoryToWordLesson(uuid: string) {

    try {
        const response = await fetch(`${env.SERVER_API_URL}/api/word-lesson/category/${uuid}`, {
            method: 'GET',
            cache: 'no-store', next: {}
        });

        if(response.ok) {
            return (await response.json()) as Category;
        }

        return undefined;

    } catch (error) {

        return undefined;
    }

}