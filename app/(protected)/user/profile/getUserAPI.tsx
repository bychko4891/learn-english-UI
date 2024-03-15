'use server'

import {env} from "@/env.mjs";
import { getJwtAccessToken } from "@/app/(protected)/jwtSessionService/authTokenHandler";
import {fetchWithToken} from "@/app/fetchWithToken";
import User from "@/user/User";


export async function getUserAPI() {

    const token = await getJwtAccessToken();


    try {
        const response = await fetch(env.SERVER_API_URL + '/api/user/profile', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        if(response.status === 401) {
            console.log(' user get 401 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        }

        return (await response.json()) as User;
        // }
    } catch (error) {
        console.error('Error fetching data USER:');
        // console.error('Error fetching data:', error);
        // Обробка помилки, якщо запит не вдалося виконати
    }


}