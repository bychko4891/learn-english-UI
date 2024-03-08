'use client'

import { GoogleColorSvgComponent } from "@/components/auntification/google/GoogleColorSvgComponent";
import { signIn } from "next-auth/react";
import {useSearchParams} from "next/navigation";


export const GoogleButtonSignUp = () => {

    const searchParams = useSearchParams()

    // const callbackUrl = "/about";
    const callbackUrl = searchParams.get("callbackUrl") || "/about";

    return (

        <button className="google-button" onClick={() => signIn('google', {callbackUrl})}>
            <GoogleColorSvgComponent/>
        </button>

    );
};