'use client'

import User from "@/user/User";
import {useUser} from "@/app/UserProvider";

export const SaveUserForContext = ({user}: {user: User }) => {

    const { user: currentUser, updateUser } = useUser();

    if(user) {
        updateUser(user);
    }
    return (
        <></>
    );
};