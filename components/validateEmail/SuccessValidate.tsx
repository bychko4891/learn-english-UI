'use client'

import {useEffect} from "react";
import {useRouter} from "next/navigation";

export const SuccessValidate = () => {
    const route = useRouter()

    useEffect(() => {
        route.push("/user/profile");
    }, []);

    return (
        <></>
    );
};