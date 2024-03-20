"use client";

import { useEffect } from "react";
import {setAccessAndRefresh} from "./setAccessAndRefresh";
import {ResponseTokens} from "@/app/DefaultResponsesInterfaces";

export function SetAllTokens({ tokens }: { tokens: ResponseTokens}) {
    useEffect(() => {
        setAccessAndRefresh(tokens);
    }, [tokens]);

    return <></>;
}