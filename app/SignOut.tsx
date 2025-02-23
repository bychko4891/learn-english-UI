'use client'

import { useUser } from "@/app/UserProvider";
import { useRouter } from 'next/navigation';
import {deleteAccessAndRefresh} from "@/app/(protected)/jwtSessionService/deleteAccessAndRefresh";
import {useEffect} from "react";


export default function SignOut() {

    const { user: currentUser, updateUser } = useUser();
    const router = useRouter();

    useEffect(() => {
        updateUser(null);
        deleteAccessAndRefresh();
        router.push("/login")
    }, []);

    return( <></> );

}