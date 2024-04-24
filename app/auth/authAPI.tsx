'use server'

import {setJwtAccessToken, setJwtRefreshToken} from "@/app/(protected)/jwtSessionService/SetHttpOnlyCookies";
import {redirect} from "next/navigation";
import {regenerateAllTokens} from "@/app/(protected)/jwtSessionService/authTokenHandler";

export async function authAPI(key: string) {

    console.log("authAPI")

    const tokens = await regenerateAllTokens(key);
    console.log("authAPI tokens")
    if (tokens) {
        console.log("authAPI tokens fetch ok")
        setJwtAccessToken(tokens.jwtAccessToken);
        setJwtRefreshToken(tokens.jwtRefreshToken);
        console.log("authAPI tokens pred redirect")
        redirect('/user/profile');
    } else {
        redirect('/login');
    }

}