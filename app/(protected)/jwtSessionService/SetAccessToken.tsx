"use client";

import { useEffect } from "react";
import { setToken } from "./setToken";

export function SetAccessToken({ accessToken }: { accessToken: string }) {
    useEffect(() => {
        setToken(accessToken);
    }, [accessToken]);

    return <></>;
}