"use server";

import { deleteJwtAccessToken } from "./SetHttpOnlyCookies";

export async function deleteAccessToken() {
    deleteJwtAccessToken();
}