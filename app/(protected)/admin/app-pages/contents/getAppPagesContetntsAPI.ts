'use server'

import {env} from "@/env.mjs";
import {getJwtAccessToken} from "@/app/(protected)/jwtSessionService/authTokenHandler";
import { stringify, parse } from 'flatted';
import {number} from "prop-types";
import {Category} from "@/components/admin/categories/Category";
import {AppPageContent, CategoryResponse} from "@/app/DefaultResponsesInterfaces";
import {fetchWithToken} from "@/app/fetchWithToken";


export async function getAppPagesContentsAPI() {

    const token = await getJwtAccessToken();

    try {
        const response = await fetchWithToken(env.SERVER_API_URL + '/api/admin/app-pages-contents', {
            method: 'GET',
        });

        if (!response?.ok) {
            throw new Error('Network response was not ok');
        }

        return (await response.json()) as AppPageContent[];
    } catch (error) {
        console.error('Error fetching data all appPagesContents to  Admin page:', error);
        // Обробка помилки, якщо запит не вдалося виконати
    }


}