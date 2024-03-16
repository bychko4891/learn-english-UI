'use client'

import {GoogleColorSvgComponent} from "@/components/auntification/google/GoogleColorSvgComponent";
import {redirect, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

type GoogleURLSend = {
    url: string;
}

export const GoogleButtonSignUp = () => {

    const [googleUrl, setGoogleUrl] = useState("");
    const googleAuth = async () => {
        const response = await fetch('/api/auth/google', {
            method: "GET"
        });

        const authUrl = await response.json() as GoogleURLSend;
        setGoogleUrl(authUrl.url);
    };

    const handleGoogleAuthClick = () => {
        googleAuth();
    };
    if (!!googleUrl) {
        redirect(googleUrl);
    }
    return (
        <button className="google-button" onClick={handleGoogleAuthClick}>
            <GoogleColorSvgComponent/>
        </button>
    );
};