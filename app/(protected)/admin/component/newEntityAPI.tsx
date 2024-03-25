'use server'

import {env} from "@/env.mjs";
import {getJwtAccessToken} from "@/app/(protected)/jwtSessionService/authTokenHandler";
import { stringify, parse } from 'flatted';
import {number} from "prop-types";
import {Category} from "@/components/admin/categories/Category";


export async function newEntityAPI(apiURL:string) {

    const token = await getJwtAccessToken();

    try {
        const response = await fetch(env.SERVER_API_URL + '/api/admin/' + apiURL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });


        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // const uuid = ;


        return await response.text();
    } catch (error) {
        console.error('Error fetching new URL Category to  Admin page:', error);
        // Обробка помилки, якщо запит не вдалося виконати
    }

}