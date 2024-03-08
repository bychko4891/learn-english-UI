import { ReactNode } from "react";
import {
  getJwtAccessToken,
  redirectUnauthorized,
  regenerateAccessToken,
  regenerateAllTokens,
  SuccessAccessTokenRegeneration,
} from "./jwtSessionService/authTokenHandler";
import { cookies } from "next/headers";
import { JWT_REFRESH_TOKEN } from "../../CooKiesName";
import { SetAccessToken } from "./jwtSessionService/SetAccessToken";
import { SetAllTokens } from "./jwtSessionService/SetAllTokens";
import {SignOut} from "@/app/(protected)/jwtSessionService/SignOut";

export default async function Layout({ children }: { children: ReactNode }) {
  const accessTokenCookie = await getJwtAccessToken();
  const accessTokenCookieIsEmpty = accessTokenCookie === undefined;
  console.log("0")
  if (accessTokenCookie) {
    console.log("1")
    return (
        <>
          {children}
        </>
    );
  }
  console.log("2")
  const accessToken = await newAccessToken(accessTokenCookieIsEmpty);
  console.log("3")
  if (accessToken) {
    console.log("4")
    return (
        <>
          <SetAccessToken accessToken={accessToken}/>
          {children}
        </>
    );
  }
  console.log("5")
  const tokens = await newRefreshAndAccessToken();
  console.log(tokens + " TOKENS ")
  if (tokens !== undefined) {
    console.log(tokens + " TOKENS 2 !!! ")
    return (
        <>
          {children}
          <SetAllTokens tokens={tokens}/>
        </>
    );
  }
  console.log("6")
  return (
      <>
        <SignOut />
        {children}
      </>
  );

  async function newAccessToken(
      accessTokenIsEmpty: boolean,
  ): Promise<string | undefined> {
    if (accessTokenIsEmpty) {
      const refreshToken = cookies().get(JWT_REFRESH_TOKEN);
      if (!refreshToken) {
        // throw await redirectUnauthorized();
        return undefined;
      }

      return await regenerateAccessToken(refreshToken.value);
    }
    return undefined;
  }

  async function newRefreshAndAccessToken(): Promise<SuccessAccessTokenRegeneration | undefined> {
    const refreshToken = cookies().get(JWT_REFRESH_TOKEN);
    if (!refreshToken) {
      // throw await redirectUnauthorized();
      return undefined;
    }

    return await regenerateAllTokens(refreshToken.value);
  }
}