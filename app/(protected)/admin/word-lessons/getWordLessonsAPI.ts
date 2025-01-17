'use server'

import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";
import {PaginationObject, WordLesson} from "@/app/DefaultResponsesInterfaces";


export async function getWordLessonsAPI(page: number, size: number) {

    const params = page > 0 || size > 25 ? `?page=${page}&size=${size}` : "";

    const response = await fetchWithToken(`${env.SERVER_API_URL}/api/v1/lesson-word/all${params}`, {
        method: 'GET',
        cache: 'no-store',
    });

    if (response?.ok) {
        return (await response.json()) as PaginationObject<WordLesson>;
    }

    throw new Error('Network response was not ok');

}