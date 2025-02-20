'use server'

import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";
import { SEOObject } from "@/app/DefaultResponsesInterfaces";

export type AppPage = {
    uuid: string;
    url: string;
    seoObject: SEOObject;
}

export async function getAppPage(uuid: string): Promise<Result<AppPage, string>> {

    try {
        const res = await fetchWithToken(`${env.SERVER_API_URL}/api/v1/app-page/${uuid}/admin`, {
            method: 'GET',
        });

        if (res?.ok) {
            const json = (await res.json()) as AppPage;
            return { ok: json, err: null }
        }

        return { ok: null, err: "Filed to fetch Application page, status: " + res?.status }

    } catch (error) {
        // console.error('Error fetching get data Category to  Admin page:', error);
        // Обробка помилки, якщо запит не вдалося виконати
        return { ok: null, err: "Filed to fetch Application page"}
    }

}