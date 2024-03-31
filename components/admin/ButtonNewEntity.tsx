'use client'

import {ReactSVG} from "react-svg";
import {newEntityAPI} from "@/app/(protected)/admin/component/newEntityAPI";
import {useEffect, useState} from "react";
import { useRouter } from "next/navigation";

export const ButtonNewEntity = ({apiRequestURL, redirectURL}: {redirectURL: string, apiRequestURL:string }) => {

    const route = useRouter();

    const [uuidUrl, setUuidUrl] = useState("");

    useEffect(() => {
        if(!!uuidUrl) {
            route.push(redirectURL + uuidUrl);
        }
    }, [uuidUrl]);


    async function handleClick () {
        const uuid = await newEntityAPI(apiRequestURL);
        if(uuid) {
            setUuidUrl(uuid);
        }
    }

    return (
        <>
            <button type="button" className="right button-new" onClick={handleClick}>
                <ReactSVG src="/images/plus.svg"  className="back-arrow-color" />
            </button>
        </>
    );
};