'use server'

import {env} from "@/env.mjs";
import {PaginationObject} from "@/app/DefaultResponsesInterfaces";
import {fetchWithToken} from "@/app/fetchWithToken";

export type SimpleAppPageContent = {
    uuid: string;
    name: string;
    sortOrder: number;
    position: string;
    applicationPageUrl: string;
}

export async function getAppPagesContents(): Promise<Result<PaginationObject<SimpleAppPageContent>, string>> {


    try {
        const res = await fetchWithToken(`${env.SERVER_API_URL}/api/v1/page-content/all`, {
            method: 'GET',
        });

        if (res?.ok) {
            const totalPages = Number(res?.headers.get("x-total-pages"));
            const json = (await res.json()) as SimpleAppPageContent[];
            return {ok: {t: json, totalPages: totalPages}, err: null}
        }

        return {ok: null, err: "Filed to fetch all contents, status: " + res?.status}

    } catch (error) {

        return {ok: null, err: "Filed to fetch all contents"}
    }
}