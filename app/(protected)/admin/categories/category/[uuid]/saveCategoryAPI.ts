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

export async function saveCategoryAPI(data:FormData, uuid: string) {


    try {
        const response = await fetchWithToken(env.SERVER_API_URL + '/api/admin/category/' + uuid, {
            method: 'PUT',
            body: data,
        });

        if (!response?.ok) {
            throw new Error('Network response was not ok');
        }

        return (await response.json()) as Category[];
    } catch (error) {
        // console.error('Error save Category to  Admin page:', error);
        return undefined;
    }

}