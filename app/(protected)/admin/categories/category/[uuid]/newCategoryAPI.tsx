'use server'

import {env} from "@/env.mjs";
import {getJwtAccessToken} from "@/app/(protected)/jwtSessionService/authTokenHandler";
import { stringify, parse } from 'flatted';
import {number} from "prop-types";
import {Category} from "@/components/admin/categories/Category";


export async function newCategoryAPI() {

    const token = await getJwtAccessToken();

    try {
        const response = await fetch(env.SERVER_API_URL + '/api/admin/categories/new-category', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }


        return (await response.json());
        // }
    } catch (error) {
        console.error('Error fetching data Categories to  Admin page:', error);
        // Обробка помилки, якщо запит не вдалося виконати
    }

}