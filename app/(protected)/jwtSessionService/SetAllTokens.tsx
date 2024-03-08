"use client";

import { useEffect } from "react";
import {setAccessAndRefreshTokens} from "./setAccessAndRefreshTokens";
import {SuccessAccessTokenRegeneration} from "@/app/(protected)/jwtSessionService/authTokenHandler";

export function SetAllTokens({ tokens }: { tokens: SuccessAccessTokenRegeneration}) {
    useEffect(() => {
        setAccessAndRefreshTokens(tokens);
    }, [tokens]);

    return <></>;
}