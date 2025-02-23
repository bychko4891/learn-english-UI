'use server'

import {env} from "@/env.mjs";
import {Category} from "@/app/DefaultResponsesInterfaces";
import {fetchWithToken} from "@/app/fetchWithToken";

export async function getCategory(uuid: string): Promise<Result<Category, string>> {

    try {
        const res = await fetchWithToken(`${env.SERVER_API_URL}/api/v1/category/${uuid}/admin`, {
            method: 'GET',
        });

        if (res?.ok) {
            const json = (await res.json()) as Category;
            return { ok: json, err: null }
        }

        return { ok: null, err: "Filed to fetch Application page, status: " + res?.status }

    } catch (error) {

        return { ok: null, err: "Filed to fetch Application page"}
    }

}