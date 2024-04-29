'use server'

import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";
import {Article, PaginationObject, ResponseMessages} from "@/app/DefaultResponsesInterfaces";
import User from "@/user/User";


export async function enableUserAPI(enable: boolean, userUuid: string) {

    const params = `?userEnable=${enable}&userUuid=${userUuid}`;

    const response = await fetchWithToken(`${env.SERVER_API_URL}/api/admin/user-enable${params}`, {
        method: 'PUT',
    });

    if (response?.ok) {
        return (await response.json()) as ResponseMessages;

    }

    throw new Error('Network response was not ok');

}