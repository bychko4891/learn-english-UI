'use server'

import {env} from "@/env.mjs";
import {getJwtAccessToken} from "@/app/(protected)/jwtSessionService/authTokenHandler";
import { stringify, parse } from 'flatted';
import {number} from "prop-types";
import {Category} from "@/components/admin/categories/Category";
import {fetchWithToken} from "@/app/fetchWithToken";


type Category = {
    uuid: string;
    name: string;
    mainCategory: boolean;
    subcategories: Category[];
}

export async function getCategoriesAPI() {


    try {
        const response = await fetchWithToken(env.SERVER_API_URL + '/api/admin/categories', {
            method: 'GET',
        });

        if (!response?.ok) {
            throw new Error('Network response was not ok');
        }


        return (await response.json()) as Category[];
        // }
    } catch (error) {
        // console.error('Error fetching data Categories to  Admin page:', error);
        return undefined;
    }

}