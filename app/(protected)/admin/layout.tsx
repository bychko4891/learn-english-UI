import {ReactNode} from "react";
import {AdminContext} from "@/app/(protected)/admin/AdminContext";
import "./admin.style.css";

export default async function Layout({children}: { children: ReactNode }) {

    return (
        <>
            <AdminContext>
                {children}
            </AdminContext>
        </>
    );
}