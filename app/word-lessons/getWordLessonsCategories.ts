import {env} from "@/env.mjs";
import { Category } from "@/app/DefaultResponsesInterfaces";


export async function getWordLessonsCategories() {

    try {
        const response = await fetch(`${env.SERVER_API_URL}/api/category/main-categories?categoryPage=lesson-words`, {
            method: 'GET',
            cache: 'no-store', next: {}
        });

        return (await response.json()) as Category[];

    } catch (error) {

        return undefined;
    }

}