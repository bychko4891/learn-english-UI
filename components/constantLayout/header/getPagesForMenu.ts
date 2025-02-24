'use server'

import {env} from "@/env.mjs";
import { Category } from "@/app/DefaultResponsesInterfaces";
import {AppPage} from "@/app/[url]/getAppPageByUrl";


export async function getPagesForMenu(): Promise<Result<AppPage[], string>>{

    try {
        const res = await fetch(`${env.SERVER_API_URL}/api/v1/app-page/all/for-menu`, {
            method: 'GET',
            cache: 'no-store', next: {}
        });

        if(res.ok) {
            const json = (await res.json()) as AppPage[];
            return { ok: json, err: null }
        }

        return {ok: null, err: "Failed fetch pages menu, status: " + res.status };

    } catch (error) {

        return { ok: null, err: "Failed fetch pages menu" };
    }

}