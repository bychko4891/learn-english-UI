'use server'

import {env} from "@/env.mjs";
import User from "@/user/User";
import {getJwtAccessToken} from "@/app/(protected)/jwtSessionService/authTokenHandler";

export async function getAdminAPI() {
    try {
        const accessToken = await getJwtAccessToken();
        const res = await fetch(`${env.SERVER_API_URL}/api/v1/admin`,
            {
            method: 'GET',
            headers: {
                authorization: "Bearer " + accessToken,
            },
        });

        if (res.status === 200) {
            return (await res.json()) as User;
        }

        if (res?.status === 401) {
            return undefined;
        }

        if(!res?.ok) {
            throw new Error;
        }
    } catch (error) {
        //     console.error('Error fetching data USER:');
        return undefined;
    }
}