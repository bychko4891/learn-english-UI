"use server";

import {setJwtAccessToken, setJwtRefreshToken} from "./SetHttpOnlyCookies";
import {SuccessAccessTokenRegeneration} from "@/app/(protected)/jwtSessionService/authTokenHandler";

export async function setAccessAndRefreshTokens(allTokens: SuccessAccessTokenRegeneration) {
    setJwtAccessToken(allTokens.jwtAccessToken);
    setJwtRefreshToken(allTokens.jwtRefreshToken);
}