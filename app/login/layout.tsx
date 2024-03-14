import LoginPage from "@/app/login/page";
import {redirect} from "next/navigation";
import React from "react";

export default async function LoginLayout() {

    // if (session?.user === null || session?.user === undefined) {
        return (
            <LoginPage/>
        );
    // } else {
    //     redirect('/about');
    // }

}
