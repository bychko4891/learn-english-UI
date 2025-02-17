'use server'

import {env} from "@/env.mjs";
import { Audio, ImageAPI } from "@/app/DefaultResponsesInterfaces";
import {fetchWithToken} from "@/app/fetchWithToken";

export type Word = {
    id: number;
    uuid: string;
    name: string;
    translate: string;
    brTranscription: string;
    usaTranscription: string;
    irregularVerbPt: string;
    irregularVerbPp: string;
    activeURL: boolean;
    correctVerb: boolean;
    wordLevel: string;
    audio: Audio | null;
    image: ImageAPI | null;
}

export async function getWordAPI(uuid: string) {


    try {
        const response = await fetchWithToken(env.SERVER_API_URL + '/api/v1/word/' + uuid, {
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