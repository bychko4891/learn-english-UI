'use server'

import {env} from "@/env.mjs";
import {ArticleResponse} from "@/app/DefaultResponsesInterfaces";
import {fetchWithToken} from "@/app/fetchWithToken";


export async function getArticleAPI(uuid: string) {


    try {
        const response = await fetchWithToken(env.SERVER_API_URL + '/api/admin/article/' + uuid, {
            method: 'GET',
        });


        if (!response?.ok) {
            throw new Error('Network response was not ok');
        }


        return (await response.json()) as ArticleResponse;
    } catch (error) {
        // console.error('Error fetching get data Category to  Admin page:', error);
        return undefined;
    }

}