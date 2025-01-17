'use server'

import {env} from "@/env.mjs";
import { SEOObject } from "@/app/DefaultResponsesInterfaces";
import {fetchWithToken} from "@/app/fetchWithToken";
import {WordCard} from "@/components/admin/wordLessons/WordLessonEdit";

export type LessonWordsBase = {
    uuid: string;
    name: string;
    description: string;
    sortOrder: number;
    categoryUUID: string;
    seoObject: SEOObject;
    lessonType: string;
}

export type LessonWordsByLevel = LessonWordsBase & {
    lessonType: "byLevel"
    cards: WordCard[];
}

export type LessonWordsAnkiType = LessonWordsBase & {
    lessonType: "ankiType";
    lessonsByLevel: LessonWordsByLevel[];
}

export type LessonWords = LessonWordsBase | LessonWordsByLevel | LessonWordsAnkiType;

export async function getWordLessonAPI(uuid: string) {


    try {
        const response = await fetchWithToken(`${env.SERVER_API_URL}/api/v1/lesson-word/${uuid}/admin`, {
            method: 'GET',
            cache: 'no-store',
        });


        if (response?.ok) {
            return (await response.json()) as LessonWords;
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