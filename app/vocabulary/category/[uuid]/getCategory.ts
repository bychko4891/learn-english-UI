import {env} from "@/env.mjs";
import {Category, CategoryResponse} from "@/app/DefaultResponsesInterfaces";


export async function getCategory(uuid: string) {

    try {
        const response = await fetch(`${env.SERVER_API_URL}/api/category/${uuid}`, {
            method: 'GET',
            cache: 'no-store', next: {}
        });

        return (await response.json()) as CategoryResponse[];

    } catch (error) {

        return undefined;
    }

}