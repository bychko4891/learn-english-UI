'use server'

import {env} from "@/env.mjs";
import { ResponseMessages } from "@/app/DefaultResponsesInterfaces";
import {fetchWithToken} from "@/app/fetchWithToken";
import {LessonWordState} from "@/components/admin/wordLessons/WordLessonEdit";
import {
    LessonWordsAnkiType,
    LessonWordsByLevel
} from "@/app/(protected)/admin/word-lessons/word-lesson/[uuid]/getWordLessonAPI";


export async function saveWordLessonAPI(data: LessonWordState, uuid: string) {

    const lesson: Record<string, any> = {
        uuid: data.uuid,
        name: data.name,
        description: data.description,
        sortOrder: data.sortOrder,
        categoryUUID: data.categoryUUID,
        seoObject: data.seoObject,
        ...(data.lessonType === "byLevel" ? {
            lessonType: "byLevel",
            cards: (data as LessonWordsByLevel).cards && (data as LessonWordsByLevel).cards.length > 0
                && (data as LessonWordsByLevel).cards.map((wc) => {
                    return {
                        uuid: wc.uuid,
                        description: wc.description,
                        wordUUID: wc.wordUUID,
                        sortOrder: wc.sortOrder,
                    };
                }) || [],
        } : {
            lessonType: "ankiType",
            lessonsByLevel: (data as LessonWordsAnkiType).lessonsByLevel && (data as LessonWordsAnkiType).lessonsByLevel.length > 0
                && (data as LessonWordsAnkiType).lessonsByLevel.map((l) => l.uuid)
        }),

    };

    const lessonType = data.lessonType === "byLevel" ? "lesson-by-level" :  "lesson-anki-type";

    try {
            const response = await fetchWithToken(`${env.SERVER_API_URL}/api/v1/${lessonType}/${uuid}`, {
                method: 'PUT',
                body: JSON.stringify(lesson),
                headers: {
                    'Content-Type': 'application/json'
                }
        });


        if (response?.ok) {
            const message = (await  response.json()) as ResponseMessages;
            message.status = 200;
            return message;
        }

        if (response?.status === 400) {
            const message = (await  response.json()) as ResponseMessages;
            message.status = 400;
            return message;
        }

        return undefined;
    } catch (error) {
        // console.error('Error fetching data App content page to  Admin page:', error);
        return undefined;
    }

}