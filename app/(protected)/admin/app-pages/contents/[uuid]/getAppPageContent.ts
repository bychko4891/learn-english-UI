'use server'

import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";
import {SimpleAppPage} from "@/app/(protected)/admin/app-pages/getAppPages";
import {ImageAPI} from "@/app/DefaultResponsesInterfaces";

export type AppPageContent = {
    uuid: string;
    name: string;
    description: string;
    sortOrder: number;
    applicationPage: SimpleAppPage,
    position: string;
    image: ImageAPI;
}

export async function getAppPageContent(uuid: string): Promise<Result<AppPageContent, string>> {

    try {
        const res = await fetchWithToken(`${env.SERVER_API_URL}/api/v1/page-content/${uuid}/admin`, {
            method: 'GET',
        });

        if (res?.ok) {
            const json = (await res.json()) as AppPageContent;
            return { ok: json, err: null }
        }

        return { ok: null, err: "Filed to fetch Application page, status: " + res?.status }

    } catch (error) {

        return { ok: null, err: "Filed to fetch Application page"}
    }

}