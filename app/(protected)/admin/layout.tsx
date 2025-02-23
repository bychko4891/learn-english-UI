import {ReactNode} from "react";
import {AdminContext} from "@/app/(protected)/admin/AdminContext";
import "./admin.style.css";
import {SideBar} from "@/app/(protected)/admin/designComponents/sidebar/SideBar";
import {ConstantLayout} from "@/app/(protected)/admin/ConstantLayout";

export default async function Layout({children}: { children: ReactNode }) {


    return (
        <>
            <AdminContext>
                <ConstantLayout>
                    <SideBar/>
                    <main id="app-content">
                        {children}
                    </main>
                </ConstantLayout>
            </AdminContext>
        </>
    );


}