'use server'

import {env} from "@/env.mjs";
import {SuccessResponse} from "@/app/DefaultResponsesInterfaces";
import {fetchWithToken} from "@/app/fetchWithToken";
import {SaveAppPageErrors} from "@/app/(protected)/admin/app-pages/[uuid]/saveAppPage";
import {AppPageContent} from "@/app/[url]/getAppPageContentsByUrl";


export async function saveAppPageContent(data: FormData, uuid: string): Promise<Result<SuccessResponse<AppPageContent>, SaveAppPageErrors>> {

    try {
        const res = await fetchWithToken(`${env.SERVER_API_URL}/api/v1/page-content/${uuid}/admin`, {
            method: 'PUT',
            body: data,
        });

        if (res?.ok) {
            const json = (await res.json()) as SuccessResponse<AppPageContent>;
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