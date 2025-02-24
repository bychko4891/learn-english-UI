import {env} from "@/env.mjs";
import { Category } from "@/app/DefaultResponsesInterfaces";


export async function getDictionaryPageMainCategories() {

    try {
        const response = await fetch(`${env.SERVER_API_URL}/api/v1/category/main-by-page?categoryPage=dictionary`, {
            method: 'GET',
            cache: 'no-store', next: {}
        });

        return (await response.json()) as Category[];

    } catch (error) {

        return undefined;
    }

}