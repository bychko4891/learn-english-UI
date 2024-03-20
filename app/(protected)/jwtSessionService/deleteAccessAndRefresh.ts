"use server";

import { deleteJwtAccessToken, deleteJwtRefreshToken } from "./SetHttpOnlyCookies";

export async function deleteAccessAndRefresh() {
    deleteJwtAccessToken();
    deleteJwtRefreshToken();
}