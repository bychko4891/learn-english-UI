'use server'

import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";
import {Category} from "@/app/DefaultResponsesInterfaces";
import {buildQueryParams} from "@/app/utils/buildQueryParams";


export async function getCategoriesAPI(params: {searchQuery?: string; categoryPage?: string; parentCategory?: boolean;}): Promise<Result<Category[], string>> {

    try {
        const queryParams: Record<string, string> = {};
        if (params.searchQuery) queryParams.searchQuery = params.searchQuery;
        if (params.categoryPage) queryParams.categoryPage = params.categoryPage;
        if (params.parentCategory) queryParams.parentCategory = String(params.parentCategory);

        const response = await fetchWithToken(`${env.SERVER_API_URL}/api/v1/category/all?${buildQueryParams(queryParams)}`, {
            method: 'GET',
            cache: 'no-store'

        });

        if (!response?.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await (await response.json()) as Category[];
        return {ok: json, err: null}
        // }
    } catch (error) {
        // console.error('Error fetching data Categories to  Admin page:', error);
        return {ok: null, err: "failed to fetch categories"};
    }

}