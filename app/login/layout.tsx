import {getServerSession} from "next-auth";
import {authConfig} from "@/configs/auth";
import LoginPage from "@/app/login/page";
import {redirect} from "next/navigation";
import React from "react";

export default async function LoginLayout() {
    const session = await getServerSession(authConfig);
    if (session?.user === null || session?.user === undefined) {
        return (
            <LoginPage/>
        );
    } else {
        redirect('/about');
    }

}
