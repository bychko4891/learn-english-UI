'use server'

import {env} from "@/env.mjs";
import {fetchWithToken} from "@/app/fetchWithToken";

export type StorageFolder = {
    id: number;
    storageName: string;
}

export async function getStoragesAPI(): Promise<Result<StorageFolder[], string>> {

    try {

        const response = await fetchWithToken(env.SERVER_API_URL + '/api/v1/storage-directory/all', {
            method: 'GET',
        });

        if (response?.ok) {
            const json = (await response.json())  as StorageFolder[];
            return {ok: json, err: null}
        }

        return {ok: null, err: ""};

    } catch (error) {
        // console.error('Error fetching get data Category to  Admin page:', error);
        return {ok: null, err: ""};
    }

}