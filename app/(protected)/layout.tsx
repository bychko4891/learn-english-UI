import {ReactNode} from "react";
import {
  getJwtAccessToken, getJwtRefreshToken,
  regenerateAccessToken,
  regenerateAllTokens,
} from "./jwtSessionService/authTokenHandler";
import {SetAccessToken} from "./jwtSessionService/SetAccessToken";
import {SetAllTokens} from "./jwtSessionService/SetAllTokens";
import SignOut from "@/app/SignOut";
import { Suspense } from 'react'
import {ResponseTokens} from "@/app/DefaultResponsesInterfaces";
import {Loading} from "@/app/suspense_fallback/Loading";


export default async function Layout({ children }: { children: ReactNode }) {
  const accessTokenCookie = await getJwtAccessToken();


  if (accessTokenCookie) {
    return (
        <>
          {children}
        </>
    );
  }

  const accessToken = await newAccessToken();

  if (accessToken) {

    return (
        <>
            <Suspense fallback={<Loading />} >
                <SetAccessToken accessToken={accessToken}/>
            </Suspense>
          {children}
        </>
    );
  }
  const tokens = await newRefreshAndAccessToken();
  if (tokens !== undefined) {
    return (
        <>
            <Suspense fallback={<Loading />} >
                <SetAllTokens tokens={tokens}/>
            </Suspense>
            {children}
        </>
    );
  }
  // if()
  return (
      <>
        <SignOut />
        {/*{children}*/}
      </>
  );

  async function newAccessToken(): Promise<string | undefined> {

      const refreshToken = await getJwtRefreshToken();
      if (!refreshToken) {
        return undefined;
      }

      return await regenerateAccessToken(refreshToken);
  }

  async function newRefreshAndAccessToken(): Promise<ResponseTokens | undefined> {
    const refreshToken = await getJwtRefreshToken();
    if (!refreshToken) {
      return undefined;
    }

    return await regenerateAllTokens(refreshToken);
  }

}