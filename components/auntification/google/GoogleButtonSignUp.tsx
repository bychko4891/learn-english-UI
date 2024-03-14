'use client'

import { GoogleColorSvgComponent } from "@/components/auntification/google/GoogleColorSvgComponent";
import {redirect, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

type GoogleURLSend = {
    url: string;
}

export const GoogleButtonSignUp = () => {

    const searchParams = useSearchParams()

    // const callbackUrl = "/about";
    const callbackUrl = searchParams.get("callbackUrl") || "/about";
    const [googleUrl, setGoogleUrl] = useState("");
    const googleAuth = async () => {
        const response = await fetch('/api/auth/google', {
            method: "GET"
        });

        console.log(response + " !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        const authUrl  = await response.json() as GoogleURLSend;
        console.log(authUrl.url + " google url !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        setGoogleUrl(authUrl.url);
    };

    const handleGoogleAuthClick = () => {
        googleAuth();
    };
    if(!!googleUrl) {
        redirect(googleUrl);
    }
    return (

        <button className="google-button" onClick={handleGoogleAuthClick}>
        {/*<button className="google-button" onClick={() => signIn('google', {callbackUrl})}>*/}
            <GoogleColorSvgComponent/>
        </button>

    );
};