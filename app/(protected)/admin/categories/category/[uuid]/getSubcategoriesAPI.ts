'use server'

import {env} from "@/env.mjs";
import {getJwtAccessToken} from "@/app/(protected)/jwtSessionService/authTokenHandler";
import { stringify, parse } from 'flatted';
import {number} from "prop-types";
import {Category} from "@/components/admin/categories/Category";
import {CategoryRequest} from "@/app/DefaultResponsesInterfaces";


export async function getCategoryAPI(uuid: string) {

    const token = await getJwtAccessToken();

    try {
        const response = await fetch(env.SERVER_API_URL + '/api/admin/category/' + uuid, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });


        if (!response.ok) {
            throw new Error('Network response was not ok');
        }


        const category = (await response.json()) as CategoryRequest;
        console.log(category.category.uuid + " CAtegory API %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*************************")
        return category;
    } catch (error) {
        console.error('Error fetching get data Category to  Admin page:', error);
        // Обробка помилки, якщо запит не вдалося виконати
    }

}