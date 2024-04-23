'use server'

import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";
import {Category} from "@/app/DefaultResponsesInterfaces";


export async function getCategoriesAPI() {


    try {
        const response = await fetchWithToken(env.SERVER_API_URL + '/api/admin/categories', {
            method: 'GET',
            cache: 'no-store'

        });

        if (!response?.ok) {
            throw new Error('Network response was not ok');
        }


        return (await response.json()) as Category[];
        // }
    } catch (error) {
        // console.error('Error fetching data Categories to  Admin page:', error);
        return undefined;
    }

}