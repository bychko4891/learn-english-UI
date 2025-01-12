"use server";

import {setJwtAccessToken, setJwtRefreshToken} from "./SetHttpOnlyCookies";
import {ResponseTokens} from "@/app/DefaultResponsesInterfaces";

export async function setAccessAndRefresh(allTokens: ResponseTokens): Promise<boolean> {
    setJwtAccessToken(allTokens.accessJwtToken);
    setJwtRefreshToken(allTokens.refreshJwtToken);
    return true;
}