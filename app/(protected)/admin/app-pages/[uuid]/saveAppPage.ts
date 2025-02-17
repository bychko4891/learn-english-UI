'use server'

import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";
import {SuccessResponse} from "@/app/DefaultResponsesInterfaces";
import {AppPage} from "@/app/(protected)/admin/app-pages/[uuid]/getAppPage";

export type SaveAppPageErrors = {
    url?: string;
    seoObject?: {
        h1?: string;
        htmlTagDescription?: string,
        htmlTagTitle?: string,
    };
    error?: string;
}

export async function saveAppPage(data: Record<string, any>, uuid: string): Promise<Result<SuccessResponse<AppPage>, SaveAppPageErrors>> {

    try {
        const res = await fetchWithToken(`${env.SERVER_API_URL}/api/v1/app-page/${uuid}/admin`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res?.ok) {
            const json = (await res.json()) as SuccessResponse<AppPage>;
            return { ok: json, err: null }
        }

        if(res?.status === 400 || res?.status === 409) {
            const errors = (await  res.json()) as SaveAppPageErrors;
            return { ok: null, err: errors };
        }

        return {ok: null, err: {error: "Filed to fetch save App page, status: " + res?.status }};

    } catch (error) {

        return {ok: null, err: {error: "Filed to fetch save App page" }};
    }

}