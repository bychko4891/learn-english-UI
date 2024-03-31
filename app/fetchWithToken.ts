import {
    getJwtAccessToken,
    getJwtRefreshToken,
    regenerateAccessToken
} from "@/app/(protected)/jwtSessionService/authTokenHandler";

export const fetchWithToken = async (url: string, options: any) => {

    const accessToken = await getJwtAccessToken();

    if (accessToken) {
        const headers = {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
        };

        const updatedOptions = {...options, headers};

        return fetch(url, updatedOptions);

    }
    const jwtToken = await getJwtRefreshToken();
    if(jwtToken) {
        const newAccessToken = await regenerateAccessToken(jwtToken);
        const headers = {
            ...options.headers,
            Authorization: `Bearer ${newAccessToken}`,
        };

        const updatedOptions = {...options, headers};

        return fetch(url, updatedOptions);
    }
};