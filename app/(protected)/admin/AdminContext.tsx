'use client'

import {useUser} from "@/app/UserProvider";
import {ReactNode, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {DeleteJwtAccessToken} from "@/app/(protected)/jwtSessionService/DeleteJwtAccessToken";

export function AdminContext({children}: { children: ReactNode }) {
    const {user} = useUser();
    const [userRole, setUserRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            setUserRole(user.userRole[0]);
            setIsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (!isLoading && userRole !== "ROLE_ADMIN") {
            router.push("/user/profile");
        }
    }, [isLoading, userRole]);

    if (isLoading) {
        return null;
    }

    return <>{children}</>;


}