'use server'

import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";
import {Article, PaginationObject} from "@/app/DefaultResponsesInterfaces";
import User from "@/user/User";


export async function getUsersAPI(page: number, size: number) {

    const params = page > 0 || size > 25 ? `?page=${page}&size=${size}` : "";

    const response = await fetchWithToken(`${env.SERVER_API_URL}/api/admin/users${params}`, {
        method: 'GET',
        cache: 'no-store',
    });

    if (response?.ok) {
        return (await response.json()) as PaginationObject<User>;

    }

    throw new Error('Network response was not ok');

}