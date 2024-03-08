'use client'

import {Header} from "@/components/constantLayout/header/Header";
import {ReactNode, useState} from "react";

export function ConstantLayout({children}: { children: ReactNode }) {

    const [isMainWrapperActive, setIsMainWrapperActive] = useState(false);

    async function handleClick() {
        setIsMainWrapperActive(!isMainWrapperActive);
    }
    const mainWrapperClasses = isMainWrapperActive ? 'main-wrapper toggled' : 'main-wrapper';

    return (

        <div id="main-wrapper" className={mainWrapperClasses}>
            <Header burgerButtonClick={ handleClick } />
           {children}
        </div>

    );
}