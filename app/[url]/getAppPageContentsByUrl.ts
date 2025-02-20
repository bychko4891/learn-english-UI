import {env} from "@/env.mjs";
import {ImageAPI, SEOObject} from "@/app/DefaultResponsesInterfaces";
import {SimpleAppPage} from "@/app/(protected)/admin/app-pages/getAppPages";

export type AppPageContent = {
    uuid: string;
    name: string;
    description: string;
    sortOrder: number;
    applicationPage: SimpleAppPage,
    position: string;
    image: ImageAPI;
}

export async function getAppPageContentsByUrl(url: string) {

    try {
        const response = await fetch(`${env.SERVER_API_URL}/api/v1/page-content/by-page/${url}`, {
            method: 'GET',
            cache: 'no-store', next: {}
        });

        return (await response.json()) as AppPageContent[];

    } catch (error) {

        return undefined;
    }

}