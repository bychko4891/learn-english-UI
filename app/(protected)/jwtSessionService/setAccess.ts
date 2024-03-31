"use server";

import { setJwtAccessToken } from "./SetHttpOnlyCookies";

export async function setAccess(accessToken: string) {
    console.log(" 12 ")
    setJwtAccessToken(accessToken);
}
