'use server'

import {env} from "@/env.mjs";
import {EntityAndMainCategoriesResp, WordLesson} from "@/app/DefaultResponsesInterfaces";
import {fetchWithToken} from "@/app/fetchWithToken";


export async function getWordLessonAPI(uuid: string) {


    try {
        const response = await fetchWithToken(env.SERVER_API_URL + '/api/admin/word-lesson/' + uuid, {
            method: 'GET',
            cache: 'no-store',
        });


        if (response?.ok) {
            return (await response.json()) as EntityAndMainCategoriesResp<WordLesson>;
            // throw new Error('Network response was not ok');
        }
        // console.log(JSON.stringify(response));
        // const s = (await response.json()) as AppPageContentRequest;
        // console.log(s.applicationPageContent.description + " descr!!!!!! !!!!");

        return undefined;
    } catch (error) {
        // console.error('Error fetching get data Category to  Admin page:', error);
        return undefined;
    }

}