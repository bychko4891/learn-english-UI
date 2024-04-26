'use server'

import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";
import {DictionaryPage, PaginationObject} from "@/app/DefaultResponsesInterfaces";


export async function getDictionaryPagesAPI(page: number, size: number) {

    const params = page > 0 || size > 25 ? `?page=${page}&size=${size}` : "";

        const response = await fetchWithToken(`${env.SERVER_API_URL}/api/admin/dictionary-pages${params}`, {
            method: 'GET',
            cache: 'no-store',
        });

        if (response?.ok) {
            return (await response.json()) as PaginationObject<DictionaryPage>;
        }

        throw new Error();

}