"use client";

import { useEffect } from "react";
import { setAccess } from "./setAccess";
import {deleteAccessToken} from "@/app/(protected)/jwtSessionService/deleteAccessToken";

export function DeleteJwtAccessToken() {
    useEffect(() => {
        deleteAccessToken();
    }, []);

    return <></>;
}