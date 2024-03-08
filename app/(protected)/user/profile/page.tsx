"use server";

import {getServerSession} from "next-auth";
import {authConfig} from "@/configs/auth";
import {LeftBlock} from "@/components/user/profile/LeftBlock";
import {RightBlock} from "@/components/user/profile/RightBlock";


export default async function UserProfile() {

    const session = await getServerSession(authConfig);


    return (
        <div className="app-content-area row row-cols-1 row-cols-md-2 mx-auto">

            <LeftBlock />

            <RightBlock />

        </div>
    );
}