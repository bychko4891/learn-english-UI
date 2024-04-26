'use client'

import {useSearchParams} from "next/navigation";
import {useEffect} from "react";
import {authAPI} from "@/app/auth/authAPI";

export const UserGoogleAuth = () => {

    const searchParams = useSearchParams();
    const key = searchParams.get("key");
    useEffect(() => {
        const fetchData = async () => {
            if (key) {
                await authAPI(key);
            }
        };
        fetchData();
    }, [key]);


    return (
        <>
        </>
    );

};