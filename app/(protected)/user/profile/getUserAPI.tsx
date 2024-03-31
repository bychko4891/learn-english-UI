'use server'

import {env} from "@/env.mjs";
import {getJwtAccessToken} from "@/app/(protected)/jwtSessionService/authTokenHandler";
import {fetchWithToken} from "@/app/fetchWithToken";
import User from "@/user/User";
import {deleteJwtAccessToken} from "@/app/(protected)/jwtSessionService/SetHttpOnlyCookies";
import {deleteAccessAndRefresh} from "@/app/(protected)/jwtSessionService/deleteAccessAndRefresh";


export async function getUserAPI() {

    try {
        const response = await fetchWithToken(env.SERVER_API_URL + '/api/user/profile', {
            method: 'GET',
        });

        if (response?.ok) {
            return (await response.json()) as User;
        }

        if (response?.status === 401) {
            return undefined;
        }


    } catch (error) {
        console.error('Error fetching data USER:');
        // console.error('Error fetching data:', error);
    }
}