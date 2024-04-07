'use server'

import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";
import {Article} from "@/app/DefaultResponsesInterfaces";


export async function getArticlesAPI() {


    try {
        const response = await fetchWithToken(`${env.SERVER_API_URL}/api/admin/articles`, {
            method: 'GET',
        });

        if (!response?.ok) {
            throw new Error('Network response was not ok');
        }


        return (await response.json()) as Article[];
        // }
    } catch (error) {
        // console.error('Error fetching data Categories to  Admin page:', error);
        return undefined;
    }

}