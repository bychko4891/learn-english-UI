import React from "react";
import {Inter} from "next/font/google";
import "./globals.css";
import "./bootstrap.custom.min.css";
import {UserProvider} from "@/app/UserProvider";
import {IsUser} from "@/app/IsUser";
import {cookies} from "next/headers";

const inter = Inter({subsets: ["latin"]});



export default function RootLayout({ children,}: Readonly<{ children: React.ReactNode;}>) {

    const role = cookies().get("role")?.value;

    return (
        <html lang="uk-UA">
        <body>
        <UserProvider >
            <IsUser >
                {children}
            </IsUser>
        </UserProvider>
        </body>
        </html>
    );
}
