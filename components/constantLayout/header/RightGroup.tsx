import React from "react";
import {BlackWhiteThemeSwitcher} from "./BlackWhiteThemeSwitcher";
import { useUser } from "@/app/UserProvider";
import {Notifications} from "./Notifications";
import {UserGroup} from "./UserGroup";
import {LoginButton} from "@/components/constantLayout/header/LoginButton";

export const RightGroup = () => {

    const { user } = useUser();

    return (
        <ul className="navbar-nav navbar-right-wrap ms-lg-auto d-flex nav-top-wrap align-items-center ms-4 ms-lg-0">

            <BlackWhiteThemeSwitcher />

            {!user && <LoginButton />}
            { user && <Notifications /> }
            { user && <UserGroup /> }

        </ul>
    );

};