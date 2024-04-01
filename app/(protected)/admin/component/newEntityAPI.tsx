'use server'

import {env} from "@/env.mjs";
import {getJwtAccessToken} from "@/app/(protected)/jwtSessionService/authTokenHandler";
import { stringify, parse } from 'flatted';
import {number} from "prop-types";
import {Category} from "@/components/admin/categories/Category";
import {fetchWithToken} from "@/app/fetchWithToken";


export async function newEntityAPI(apiURL:string) {

    try {
        const response = await fetchWithToken(env.SERVER_API_URL + `/api/admin${apiURL}`, {
            method: 'GET',
        });


        if (!response?.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.text();
    } catch (error) {
        console.error('Error fetching new ~~ Entity ~~ to  Admin page:', error);
        // Обробка помилки, якщо запит не вдалося виконати
    }

}