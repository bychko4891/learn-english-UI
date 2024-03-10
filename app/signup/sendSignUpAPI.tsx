'use server'

import {env} from "@/env.mjs";
import {redirect} from "next/navigation";


export type DataSendSignUp = {
    name: string;
    email: string;
    password: string;
};


export async function sendSignUpAPI(formValues: DataSendSignUp) {

    const response = await fetch(env.SERVER_API_URL + '/api/signup', {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        redirect("/signup/success");
    }

    if (response.status === 400) {
        return (await response.json()) as DataSendSignUp;
    }

}