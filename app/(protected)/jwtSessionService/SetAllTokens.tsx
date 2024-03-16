"use client";

import { useEffect } from "react";
import {setAccessAndRefresh} from "./setAccessAndRefresh";
import {SuccessAccessTokenRegeneration} from "@/app/(protected)/jwtSessionService/authTokenHandler";

export function SetAllTokens({ tokens }: { tokens: SuccessAccessTokenRegeneration}) {
    useEffect(() => {
        setAccessAndRefresh(tokens);
    }, [tokens]);

    return <></>;
}