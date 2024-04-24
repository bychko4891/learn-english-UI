// 'use server'

import {
    getJwtAccessToken,
    getJwtRefreshToken,
    regenerateAccessToken
} from "@/app/(protected)/jwtSessionService/authTokenHandler";

export const fetchWithToken = async (url: string, options: any) => {

    const accessToken = await getJwtAccessToken();
    console.log(accessToken);

    if (accessToken) {
        const headers = {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
        };

        const updatedOptions = {...options, headers};

        return fetch(url, updatedOptions);

    }

    const jwtToken = await getJwtRefreshToken();

    console.log("jwtTOKEN: "  + jwtToken);

    if(jwtToken) {
        console.log("jwtTOKEN: OK "  );
        const newAccessToken = await regenerateAccessToken(jwtToken);
        const headers = {
            ...options.headers,
            Authorization: `Bearer ${newAccessToken}`,
        };

        const updatedOptions = {...options, headers};

        return fetch(url, updatedOptions);
    }
};