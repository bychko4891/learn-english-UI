"use server";

import {setJwtAccessToken, setJwtRefreshToken} from "./SetHttpOnlyCookies";
import {ResponseTokens} from "@/app/DefaultResponsesInterfaces";

export async function setAccessAndRefresh(allTokens: ResponseTokens) {
    setJwtAccessToken(allTokens.jwtAccessToken);
    setJwtRefreshToken(allTokens.jwtRefreshToken);
}