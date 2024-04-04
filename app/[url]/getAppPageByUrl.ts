import {env} from "@/env.mjs";
import {getJwtAccessToken} from "@/app/(protected)/jwtSessionService/authTokenHandler";
import {AppPage} from "@/app/DefaultResponsesInterfaces";


export async function getAppPageByUrl(url: string) {

    try {
        const response = await fetch(env.SERVER_API_URL + `/api/page/${url}`, {
            method: 'GET',
            cache: 'no-store', next: {}
        });

        return (await response.json()) as AppPage;

    } catch (error) {

        return undefined;
    }

}