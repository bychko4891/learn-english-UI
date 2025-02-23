'use client'

import React, {ReactNode, Suspense, useState} from "react";
import {Loading} from "@/app/suspense_fallback/Loading";
import {Header} from "@/app/(protected)/admin/designComponents/Header";

export function ConstantLayout({children}: { children: ReactNode }) {

    const [sideBarActive, setSideBarActive] = useState(false);

    return (

        <div id="main-wrapper" className={sideBarActive ? 'main-wrapper toggled' : 'main-wrapper'}>
            <Header sideBarActive={sideBarActive} setSideBarActive={setSideBarActive}/>
            <Suspense fallback={< Loading />}>
                {children}
            </Suspense>
        </div>

    );
}