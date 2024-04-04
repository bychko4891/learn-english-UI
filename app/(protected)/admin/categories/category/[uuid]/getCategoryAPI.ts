'use server'

import {env} from "@/env.mjs";
import {getJwtAccessToken} from "@/app/(protected)/jwtSessionService/authTokenHandler";
import { stringify, parse } from 'flatted';
import {number} from "prop-types";
import {Category} from "@/components/admin/categories/Category";
import {CategoryResponse} from "@/app/DefaultResponsesInterfaces";
import {fetchWithToken} from "@/app/fetchWithToken";


export async function getCategoryAPI(uuid: string) {


    try {
        const response = await fetchWithToken(env.SERVER_API_URL + '/api/admin/category/' + uuid, {
            method: 'GET',
        });


        if (!response?.ok) {
            throw new Error('Network response was not ok');
        }


        return (await response.json()) as CategoryResponse;
    } catch (error) {
        // console.error('Error fetching get data Category to  Admin page:', error);
        return undefined;
    }

}