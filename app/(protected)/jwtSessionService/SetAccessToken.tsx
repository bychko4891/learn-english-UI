"use client";

import { useEffect } from "react";
import { setAccess } from "./setAccess";

export function SetAccessToken({ accessToken }: { accessToken: string }) {
    useEffect(() => {
        setAccess(accessToken);
    }, [accessToken]);

    return <></>;
}