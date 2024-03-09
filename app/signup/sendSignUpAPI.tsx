'use server'

import {env} from "@/env.mjs";
import {redirect} from "next/navigation";


type BadRequestSignUp = {
    name: string;
    email: string;
    password: string;
};

export async function sendSignUpAPI(data: FormData) {

    try {
        const response = await fetch(env.SERVER_API_URL + '/api/signup', {
            body: JSON.stringify(data),
            method: 'POST'
        });

        if(response.ok) {
            redirect("/");
        }

        if(response.status === 400) {
            return (await response.json())as BadRequestSignUp;
        }

        return response;

    } catch (error) {
        console.error('Error fetching data ABOUT:', error);
        // Обробка помилки, якщо запит не вдалося виконати
    }

}