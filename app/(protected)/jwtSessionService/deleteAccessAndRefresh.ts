"use server";

import { deleteJwtAccessToken, deleteJwtRefreshToken } from "./SetHttpOnlyCookies";
import { cookies } from "next/headers";


export async function deleteAccessAndRefresh() {
    deleteJwtAccessToken();
    deleteJwtRefreshToken();
    // fetch(env.NEXT_PUBLIC_SERVER_URL + "/api/v1/auth/logout", {
    //     method: "DELETE",
    //     headers: {
    //         Authorization: "Bearer " + (await getJwtAccessToken()),
    //     },
    // });
    // cookies().delete(JWT_ACCESS_TOKEN);
    // cookies().delete(JWT_REFRESH_TOKEN);
    // cookies().delete(ROLE);
    // redirect("/login");
}