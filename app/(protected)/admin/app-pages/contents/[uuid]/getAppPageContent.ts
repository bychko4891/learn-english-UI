'use server'

import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";
import {AppPageContent} from "@/app/[url]/getAppPageContentsByUrl";



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