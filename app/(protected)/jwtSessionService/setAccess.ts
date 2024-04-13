"use server";

import { setJwtAccessToken } from "./SetHttpOnlyCookies";

export async function setAccess(accessToken: string) {
    setJwtAccessToken(accessToken);
}
