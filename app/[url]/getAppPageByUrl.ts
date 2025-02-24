import {env} from "@/env.mjs";
import {SEOObject} from "@/app/DefaultResponsesInterfaces";

export type AppPage = {
    uuid: string;
    url: string;
    seoObject: SEOObject;
    pageType: string;
    inMenu: boolean;
}

export async function getAppPageByUrl(url: string) {

    try {
        const response = await fetch(`${env.SERVER_API_URL}/api/v1/app-page/${url}`, {
            method: 'GET',
            cache: 'no-store', next: {}
        });

        return (await response.json()) as AppPage;

    } catch (error) {

        return undefined;
    }

}