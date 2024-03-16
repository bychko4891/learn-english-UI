'use client'

import {Header} from "@/components/constantLayout/header/Header";
import {ReactNode, Suspense, useState} from "react";
import {Loading} from "@/app/suspense_fallback/Loading";

export function ConstantLayout({children}: { children: ReactNode }) {

    const [isMainWrapperActive, setIsMainWrapperActive] = useState(false);

    async function handleClick() {
        setIsMainWrapperActive(!isMainWrapperActive);
    }
    const mainWrapperClasses = isMainWrapperActive ? 'main-wrapper toggled' : 'main-wrapper';

    return (

        <div id="main-wrapper" className={mainWrapperClasses}>
            <Header burgerButtonClick={ handleClick } />
            <Suspense fallback={< Loading />}>
                {children}
            </Suspense>
        </div>

    );
}