import React from "react";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import "./bootstrap.custom.min.css";
import {ConstantLayout} from "@/app/ConstantLayout";
import {SideBar} from "@/components/constantLayout/sidebar/SideBar";
import {Providers} from "@/components/Providers";

const inter = Inter({subsets: ["latin"]}
);

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children,}: Readonly<{ children: React.ReactNode;}>) {

    return (
        <html lang="uk-UA">
        <body>
        {/*<Providers>*/}
            <ConstantLayout>
                <SideBar/>
                <main id="app-content">
                    {children}
                </main>
            </ConstantLayout>
        {/*</Providers>*/}
        </body>
        </html>
    );
}
