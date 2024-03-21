'use client'

import { useUser } from "@/app/UserProvider";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

export function AdminContext({ children }: { children: ReactNode }) {
    const { user } = useUser();

    const userRole = user?.userRole[0];

    if (userRole === "ROLE_ADMIN") {
        return <>{children}</>;
    } else {
        return <> <Redirect /></>; // Якщо користувач не має прав адміністратора, просто повертаємо null
    }
}

export const Redirect = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("/user/profile");
    }, []);

    return null;
};