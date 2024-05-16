import { env } from "@/env.mjs";
import { WordLesson } from "@/app/DefaultResponsesInterfaces";


export async function getWordLesson(uuid: string) {

    try {
        const response = await fetch(`${env.SERVER_API_URL}/api/word-lesson/${uuid}`, {
            method: 'GET',
            cache: 'no-store', next: {}
        });

        if (response.ok) {
            return (await response.json()) as WordLesson;
        }

        return undefined;

    } catch (error) {

        return undefined;
    }

}