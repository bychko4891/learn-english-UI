'use server'

import {env} from "@/env.mjs";
import {getJwtAccessToken} from "@/app/(protected)/jwtSessionService/authTokenHandler";
import { stringify, parse } from 'flatted';
import {number} from "prop-types";
import {Category} from "@/components/admin/categories/Category";


type Category = {
    uuid: string;
    name: string;
    mainCategory: boolean;
    subcategories: Category[];
}

export async function getCategoriesAPI() {

    const token = await getJwtAccessToken();

    try {
        const response = await fetch(env.SERVER_API_URL + '/api/admin/categories', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }


        return (await response.json()) as Category[];
        // }
    } catch (error) {
        console.error('Error fetching data Categories to  Admin page:', error);
        // Обробка помилки, якщо запит не вдалося виконати
    }

}