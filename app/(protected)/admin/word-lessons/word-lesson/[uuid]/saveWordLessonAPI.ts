'use server'

import {env} from "@/env.mjs";
import {ResponseMessages} from "@/app/DefaultResponsesInterfaces";
import {fetchWithToken} from "@/app/fetchWithToken";
import {LessonWordState, WordCardState} from "@/components/admin/wordLessons/WordLessonForm";
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
        categoryName: data.categoryName,
        seoObject: data.seoObject,
        ...(data.lessonType === "byLevel" ? {
            lessonType: "byLevel",
            cards: Array.isArray(data.cards) && data.cards?.length > 0
                && data.cards?.map((wc) => {
                    return {
                        id: wc.id,
                        uuid: wc.uuid,
                        description: wc.description,
                        wordUUID: wc.wordUUID,
                        sortOrder: wc.sortOrder,
                    };
                }) || [],
        } : {
            lessonType: "ankiType",
            lessonsByLevel: [],
        }),

    };

    const lessonType = data.lessonType === "byLevel" ? "lesson-by-level" : "lesson-anki-type";

    try {
        const res = await fetchWithToken(`${env.SERVER_API_URL}/api/v1/${lessonType}/${uuid}`, {
            method: 'PUT',
            body: JSON.stringify(lesson),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res?.ok) {
            const message = (await res.json()) as ResponseMessages;
            message.status = 200;
            return message;
        }

        if (res?.status === 400) {
            const message = (await res.json()) as ResponseMessages;
            message.status = 400;
            return message;
        }

        return undefined;
    } catch (error) {
        // console.error('Error fetching data App content page to  Admin page:', error);
        return undefined;
    }

}