"use server";

import {deleteJwtAccessToken, deleteJwtRefreshToken, setJwtAccessToken, setJwtRefreshToken} from "./SetHttpOnlyCookies";
import {SuccessAccessTokenRegeneration} from "@/app/(protected)/jwtSessionService/authTokenHandler";

export async function deleteAccessAndRefresh() {
    deleteJwtAccessToken();
    deleteJwtRefreshToken();
}