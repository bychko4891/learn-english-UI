'use server'

import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";
import {PaginationObject, SEOObject} from "@/app/DefaultResponsesInterfaces";

export type SimpleAppPage = {
    uuid: string;
    url: string;
    seoObject: SEOObject;
    pageType: string;
}

export async function getAppPages(): Promise<Result<PaginationObject<SimpleAppPage>, string>> {
    try {
        const res = await fetchWithToken(`${env.SERVER_API_URL}/api/v1/app-page/all`, {
            method: 'GET',
        });

        if (res?.ok) {
            const totalPages = Number(res?.headers.get("x-total-pages"));
            const json = (await res.json()) as SimpleAppPage[];
            return {ok: {t: json, totalPages: totalPages}, err: null}
        }

        return {ok: null, err: "Filed to fetch all pages, status: " + res?.status}

    } catch (error) {

        return {ok: null, err: "Filed to fetch all pages"}
    }
}