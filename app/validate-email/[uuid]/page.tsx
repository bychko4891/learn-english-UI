'use server'

import { env } from "@/env.mjs"
import {redirect} from "next/navigation";
import {NextRequest} from "next/server";
import {replace} from "lodash-es";


export async function GET(req: NextRequest)  {

    const url = req.url;

    const apiUrl = replace(env.APP_URL, "");

    const response = await fetch(env.SERVER_API_URL + apiUrl, {
        method: 'PUT'
    });
    // redirect("/api/validate-email/" + uuid);
// const email = "email";
//
//
//     if(response.status === 200) {
//
//     }

}