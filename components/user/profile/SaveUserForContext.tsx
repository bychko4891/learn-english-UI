'use client'

import User from "@/user/User";
import {useUser} from "@/app/UserProvider";
import {useEffect} from "react";

export const SaveUserForContext = ({user}: {user: User }) => {

    const { user: currentUser, updateUser } = useUser();

    useEffect(() => {
        updateUser(user);
    }, [user]);

    return (
        <></>
    );
};