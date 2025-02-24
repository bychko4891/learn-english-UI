'use server'

import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";
import {Category, SuccessResponse} from "@/app/DefaultResponsesInterfaces";


export type SaveCategoryErrors = {
    uuid?: string;
    name?: string;
    sortOrder?: string;
    description?: string;
    shortDescription?: string;
    attentionText?: string;
    seoObject?: {
        htmlTagDescription?: string,
        htmlTagTitle?: string,
    }
    image?: {storageId?: string; width?: string; height?: string; position?: string; }
    categoryPage?: string;
    parentCategoryUUID?: string;
    error?: string;

}

export async function saveCategory(data:FormData, uuid: string): Promise<Result<SuccessResponse<Category>, SaveCategoryErrors>> {

    try {
        const res = await fetchWithToken(`${env.SERVER_API_URL}/api/v1/category/${uuid}`, {
            method: 'PUT',
            body: data,
        });

        if (res?.ok) {
            const json = (await res.json()) as SuccessResponse<Category>;
            return { ok: json, err: null }
        }

        if(res?.status === 400 || res?.status === 404 || res?.status === 409 || res?.status === 503) {
            const errors = (await  res.json()) as SaveCategoryErrors;
            return { ok: null, err: errors };
        }

        return {ok: null, err: {error: "Filed to fetch save App page, status: " + res?.status }};

    } catch (error) {

        return {ok: null, err: {error: "Filed to fetch save App page" }};
    }

}