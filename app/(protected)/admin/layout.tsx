import {ReactNode} from "react";
import {AdminContext} from "@/app/(protected)/admin/AdminContext";

export default async function Layout({children}: { children: ReactNode }) {

    return (
        <>
            <AdminContext>
                {children}
            </AdminContext>
        </>
    );
}