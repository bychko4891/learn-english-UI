'use server'

import {env} from "@/env.mjs";
import { Category } from "@/app/DefaultResponsesInterfaces";
import {AppPage} from "@/app/[url]/getAppPageByUrl";


export async function getMainCategories(): Promise<Result<Category[], string>>{

    try {
        const res = await fetch(`${env.SERVER_API_URL}/api/v1/category/main/all`, {
            method: 'GET',
            cache: 'no-store', next: {}
        });

        if(res.ok) {
            const json = (await res.json()) as Category[];
            return { ok: json, err: null }
        }

        return {ok: null, err: "Failed fetch main categories, status: " + res.status };

    } catch (error) {

        return { ok: null, err: "Failed fetch main categories" };
    }

}