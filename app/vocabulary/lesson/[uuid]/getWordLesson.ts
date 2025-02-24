import { env } from "@/env.mjs";
import {LessonWords} from "@/app/(protected)/admin/word-lessons/word-lesson/[uuid]/getWordLessonAPI";


export async function getWordLesson(uuid: string) {

    try {
        const response = await fetch(`${env.SERVER_API_URL}/api/word-lesson/${uuid}`, {
            method: 'GET',
            cache: 'no-store', next: {}
        });

        if (response.ok) {
            return (await response.json()) as LessonWords;
        }

        return undefined;

    } catch (error) {

        return undefined;
    }

}