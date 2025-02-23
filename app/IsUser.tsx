'use client'

import React, {ReactNode} from "react";
import {useUser} from "@/app/UserProvider";
import {Header} from "@/components/constantLayout/header/Header";

export function IsUser({children}: { children: ReactNode }) {

    const {user} = useUser();

    if (user && user.userRole === "ADMIN") {
        return children
    }

    return (
        <>
            <Header/>
            <main className="w-100 d-flex flex-column align-items-center">
                {children}
            </main>
        </>
    );
}