'use client'

import { useUser } from "@/app/UserProvider";
import { useRouter } from 'next/navigation';
import {deleteAccessAndRefresh} from "@/app/(protected)/jwtSessionService/deleteAccessAndRefresh";
import {useEffect} from "react";
import {RequestCookie} from "next/dist/compiled/@edge-runtime/cookies";


export function SignOut() {

    const { user: currentUser, updateUser } = useUser();
    const router = useRouter()

    // deleteAccessAndRefresh();

    useEffect(() => {
        updateUser(null);
        router.push("/login")
    }, []);

    return <></>;
}