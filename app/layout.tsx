import React from "react";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import "./bootstrap.custom.min.css";
import {ConstantLayout} from "@/app/ConstantLayout";
import {SideBar} from "@/components/constantLayout/sidebar/SideBar";
import {UserProvider} from "@/app/UserProvider";

const inter = Inter({subsets: ["latin"]}
);



export default function RootLayout({ children,}: Readonly<{ children: React.ReactNode;}>) {

    return (
        <html lang="uk-UA">
        <body>
        <UserProvider >
            <ConstantLayout>
                <SideBar/>
                <main id="app-content">
                    {children}
                </main>
            </ConstantLayout>
        </UserProvider>
        </body>
        </html>
    );
}
