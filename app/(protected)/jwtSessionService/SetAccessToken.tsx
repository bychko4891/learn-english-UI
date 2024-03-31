"use client";

import { useEffect } from "react";
import { setAccess } from "./setAccess";

export function SetAccessToken({ accessToken }: { accessToken: string }) {
    console.log(" 11 ")
    useEffect(() => {
        setAccess(accessToken);
    }, [accessToken]);

    return <></>;
}