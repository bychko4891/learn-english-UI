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

    console.log("0");

  if (accessTokenCookie) {
      console.log("1");
    return (
        <>
          {children}
        </>
    );
  }
    console.log("2");
  const accessToken = await newAccessToken();
    console.log("3");
  if (accessToken) {
      console.log("4");
    return (
        <>
            <Suspense fallback={<Loading />} >
                <SetAccessToken accessToken={accessToken}/>
            </Suspense>
          {children}
        </>
    );
  }
    console.log("5");
  const tokens = await newRefreshAndAccessToken();
    console.log("6");
  if (tokens !== undefined) {
      console.log("7");
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
    console.log("8");
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