'use server'

import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";
import {Article, PaginationObject} from "@/app/DefaultResponsesInterfaces";


export async function getArticlesAPI(page: number, size: number) {

    const params = page > 0 || size > 25 ? `?page=${page}&size=${size}` : "";

    const response = await fetchWithToken(`${env.SERVER_API_URL}/api/admin/articles${params}`, {
        method: 'GET',
        cache: 'no-store',
    });

    if (response?.ok) {
        return (await response.json()) as PaginationObject<Article>;

    }

    throw new Error('Network response was not ok');

}