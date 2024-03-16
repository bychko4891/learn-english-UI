'use server'

import {env} from "@/env.mjs";
import {getJwtAccessToken} from "@/app/(protected)/jwtSessionService/authTokenHandler";


type AboutSuccessResponse = {
    namePage: string;
    htmlDescription: string;
    htmlTitle: string;
    pageURL: string;
    contentsAppPage:ContentPage [];
};

type ContentPage = {
    h1: string;
    description: string;
}

export async function getAboutAPI() {

    try {
        const response = await fetch(env.SERVER_API_URL + '/api/about', {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // if(!data) {
        const aboutPage = (await response.json()) as AboutSuccessResponse;
        return aboutPage;
        // }
    } catch (error) {
        console.error('Error fetching data ABOUT:', error);
        // Обробка помилки, якщо запит не вдалося виконати
    }

}