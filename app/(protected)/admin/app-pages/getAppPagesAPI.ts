'use server'

import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";
import {AppPage} from "@/app/DefaultResponsesInterfaces";


export async function getAppPagesAPI() {
    try {
        const response = await fetchWithToken(env.SERVER_API_URL + '/api/admin/app-pages', {
            method: 'GET',
        });
        if (response?.ok) {
            return await response.json() as AppPage[];
        } else {
            throw new Error('Failed to fetch data from server => getAppPagesAPI()');
        }
    } catch (error) {
        // console.error('Error fetching data:', error);
        throw error; // Передача помилки далі до функції, що викликала getAppPagesAPI()
    }



}