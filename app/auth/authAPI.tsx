'use server'

import {setJwtAccessToken, setJwtRefreshToken} from "@/app/(protected)/jwtSessionService/SetHttpOnlyCookies";
import {redirect} from "next/navigation";
import {regenerateAllTokens} from "@/app/(protected)/jwtSessionService/authTokenHandler";

export async function authAPI(key: string) {


    const tokens = await regenerateAllTokens(key);
    if (tokens) {
        setJwtAccessToken(tokens.jwtAccessToken);
        setJwtRefreshToken(tokens.jwtRefreshToken);
        redirect('/user/profile');
    } else {
        redirect('/login');
    }

}