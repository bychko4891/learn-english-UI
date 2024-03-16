"use server";

import {LeftBlock} from "@/components/user/profile/LeftBlock";
import {RightBlock} from "@/components/user/profile/RightBlock";
import {Suspense} from "react";
import {Loading} from "@/app/suspense_fallback/Loading";


export default async function UserProfile() {


    return (
        <div className="app-content-area row row-cols-1 row-cols-md-2 mx-auto">
            <Suspense fallback={ < Loading /> }>

                <LeftBlock/>

                <RightBlock/>
            </Suspense>

        </div>
    );
}