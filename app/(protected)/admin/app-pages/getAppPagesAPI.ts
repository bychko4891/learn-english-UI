'use server'

import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";
import {AppPage} from "@/app/DefaultResponsesInterfaces";


export async function getAppPagesAPI() {

    try {

        const response = await fetchWithToken(env.SERVER_API_URL + '/api/admin/app-pages', {
            method: 'GET',
        });

        if (!response?.ok) {
            throw new Error();
        }

        return (await response?.json()) as AppPage[];

    } catch (error) {}



}