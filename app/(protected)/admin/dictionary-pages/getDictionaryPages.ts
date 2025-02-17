'use server'

import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";
import {PaginationObject} from "@/app/DefaultResponsesInterfaces";
import {buildQueryParams} from "@/app/utils/buildQueryParams";

export type SimpleDictionaryPage = {
     uuid: string;
     name: string;
     description: string;
     partOfSpeech: string;
     published: boolean;
     categoryUUID: string;
     categoryName: string;
}

export async function getDictionaryPages(params: {
    searchQuery?: string;
    page?: string;
    size?: string;
    sort?: string;
}): Promise<Result<PaginationObject<SimpleDictionaryPage>, string>> {

    const queryParams: Record<string, string> = {};
    if (params.page) queryParams.page = params.page;
    if (params.size) queryParams.size = params.size;
    if (params.sort) queryParams.sort = params.sort;
    if (params.searchQuery) queryParams.searchQuery = params.searchQuery;
    // if (!params.size) queryParams.size = "10";

    try {
        const res = await fetchWithToken(`${env.SERVER_API_URL}/api/v1/dictionary/all?${buildQueryParams(queryParams)}`, {
            method: 'GET',
            cache: 'no-store',
        });

        if (res?.ok) {
            const totalPages = Number(res?.headers.get("x-total-pages"));
            const json = (await res.json()) as SimpleDictionaryPage[];
            return {ok: {t: json, totalPages: totalPages}, err: null};
        }

        return {ok: null, err: "filed to fetch all lessons"};

    } catch (error) {

        return {ok: null, err: "filed to fetch all lessons"};
    }


}