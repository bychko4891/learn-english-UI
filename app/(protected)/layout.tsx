import {ReactNode} from "react";
import {
  getJwtAccessToken,
  regenerateAccessToken,
  regenerateAllTokens,
  SuccessAccessTokenRegeneration,
} from "./jwtSessionService/authTokenHandler";
import {cookies} from "next/headers";
import {JWT_REFRESH_TOKEN} from "../../CookiesName";
import {SetAccessToken} from "./jwtSessionService/SetAccessToken";
import {SetAllTokens} from "./jwtSessionService/SetAllTokens";
import SignOut from "@/app/SignOut";


export default async function Layout({ children }: { children: ReactNode }) {
  const accessTokenCookie = await getJwtAccessToken();
  const accessTokenCookieIsEmpty = accessTokenCookie === undefined;
  if (accessTokenCookie) {
    return (
        <>
          {children}
        </>
    );
  }
  const accessToken = await newAccessToken(accessTokenCookieIsEmpty);
  if (accessToken) {
    return (
        <>
          <SetAccessToken accessToken={accessToken}/>
          {children}
        </>
    );
  }
  const tokens = await newRefreshAndAccessToken();
  if (tokens !== undefined) {
    return (
        <>
          {children}
          <SetAllTokens tokens={tokens}/>
        </>
    );
  }
  return (
      <>
        <SignOut />
        {/*{children}*/}
      </>
  );

  async function newAccessToken(
      accessTokenIsEmpty: boolean,
  ): Promise<string | undefined> {
    if (accessTokenIsEmpty) {
      const refreshToken = cookies().get(JWT_REFRESH_TOKEN);
      if (!refreshToken) {
        return undefined;
      }

      return await regenerateAccessToken(refreshToken.value);
    }
    return undefined;
  }

  async function newRefreshAndAccessToken(): Promise<SuccessAccessTokenRegeneration | undefined> {
    const refreshToken = cookies().get(JWT_REFRESH_TOKEN);
    if (!refreshToken) {
      return undefined;
    }

    return await regenerateAllTokens(refreshToken.value);
  }

}