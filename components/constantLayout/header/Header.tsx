'use client'

import React from "react";
import {LogoMobile} from "./LogoMobile";
import { BurgerButton } from "./BurgerButton";
import {RightGroup} from "@/components/constantLayout/header/RightGroup";



export const Header = ({ burgerButtonClick }:{ burgerButtonClick: () => void } ) => {
    return (
        // <header>
            <div className="header">
                <div className="navbar-custom navbar navbar-expand-lg">
                    <div className="container-fluid px-0">
                        <BurgerButton buttonClickHandler = { burgerButtonClick } />
                        <LogoMobile/>
                        <RightGroup />
                    </div>
                </div>
            </div>
        // </header>
    );
};