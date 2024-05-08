import {env} from "@/env.mjs";
import {CategoryResponse, WordLesson} from "@/app/DefaultResponsesInterfaces";


export async function geCategoryToWordLesson(uuid: string) {

    try {
        const response = await fetch(`${env.SERVER_API_URL}/api/word-lesson/category/${uuid}`, {
            method: 'GET',
            cache: 'no-store', next: {}
        });

        return (await response.json()) as CategoryResponse<WordLesson>;

    } catch (error) {

        return undefined;
    }

}