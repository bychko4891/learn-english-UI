'use server'

import {env} from "@/env.mjs";
import {getJwtAccessToken} from "@/app/(protected)/jwtSessionService/authTokenHandler";
import {AppPageContentRequest, Word} from "@/app/DefaultResponsesInterfaces";
import {fetchWithToken} from "@/app/fetchWithToken";


export async function getWordAPI(uuid: string) {


    try {
        const response = await fetchWithToken(env.SERVER_API_URL + '/api/admin/word/' + uuid, {
            method: 'GET',

        });


        if (response?.ok) {
            return (await response.json()) as Word;
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