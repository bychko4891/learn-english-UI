import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";
import User from "@/user/User";


export async function getUserAPI() {

    // try {
        const response = await fetchWithToken(env.SERVER_API_URL + '/api/user/profile', {
            method: 'GET',
        });

        if (response?.ok) {
            return (await response.json()) as User;
        }

        if (response?.status === 401) {
            return undefined;
        }

        if(!response?.ok) {
            throw new Error;
        }

    // } catch (error) {
    //     console.error('Error fetching data USER:');
        // console.error('Error fetching data:', error);
    // }
}