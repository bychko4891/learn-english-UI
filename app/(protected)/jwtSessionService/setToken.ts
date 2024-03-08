"use server";

import { setJwtAccessToken } from "./SetHttpOnlyCookies";

export async function setToken(accessToken: string) {
    setJwtAccessToken(accessToken);
}
