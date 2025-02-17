'use server'

import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";
import { PaginationObject } from "@/app/DefaultResponsesInterfaces";
import {buildQueryParams} from "@/app/utils/buildQueryParams";
import {Word} from "@/app/(protected)/admin/words/word/[uuid]/getWordAPI";


export async function getWords(params: {
    searchQuery?: string;
    page?: string;
    size?: string;
    sort?: string;
}) {

    const queryParams: Record<string, string> = {};
    if (params.page) queryParams.page = params.page;
    if (params.size) queryParams.size = params.size;
    if (params.sort) queryParams.sort = params.sort;
    if (params.searchQuery) queryParams.searchQuery = params.searchQuery;
    // if (!params.size) queryParams.size = "10";

    const response = await fetchWithToken(`${env.SERVER_API_URL}/api/v1/word/all?${buildQueryParams(queryParams)}`, {
        method: 'GET',
        cache: 'no-store',
    });

    if (response?.ok) {
        return (await response.json()) as PaginationObject<Word>;
    }

    throw new Error('Network response was not ok');

}