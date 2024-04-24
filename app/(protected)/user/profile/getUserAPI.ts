import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";
import User from "@/user/User";


export async function getUserAPI() {
    console.log("user !!!");
    try {
        const response = await fetchWithToken(env.SERVER_API_URL + '/api/user/profile', {
            method: 'GET',
        });
        console.log(" yes user fetch !!!");
        if (response?.ok) {
            console.log("user 200 !!!");
            return (await response.json()) as User;
        }

        if (response?.status === 401) {
            console.log("user 401 !!!");
            return undefined;
        }

        if(!response?.ok) {
            console.log("user not ok !!!");
            throw new Error;
        }
        console.log("user ---- !!!");
    } catch (error) {
        console.log("user error !!!");
    //     console.error('Error fetching data USER:');
        return undefined;
    }
}