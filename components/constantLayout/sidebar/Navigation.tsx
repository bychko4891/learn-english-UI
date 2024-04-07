'use client'

import Link from "next/link";
import {usePathname} from "next/navigation";
import {ReactSVG} from 'react-svg';
import "./style.css";
import {useUser} from "@/app/UserProvider";

type NavLink = {
    label: string,
    href: string,
    imageName: string
}

type Props = {
    navLinks: NavLink[];
    navLinksAdmin: NavLink[];
}
export const Navigation = ({navLinks, navLinksAdmin}: Props) => {

    const {user} = useUser();

    const pathName = usePathname();

    const regex = /^\/admin/;

    const isAdminUrl = regex.test(pathName);
    const isUserAdmin = user?.userRole[0] === "ROLE_ADMIN";


    if (isAdminUrl && isUserAdmin) {

        return <> {navLinksAdmin.map((link) => {

            const isActive = pathName === link.href;

            return (
                <li key={link.label}>
                    <Link href={link.href}
                          className={isActive ? "d-flex gap-2 active-link active-li" : "d-flex gap-2"}>
                        <ReactSVG src={'/images/' + link.imageName} aria-label={link.label}
                                  className="colored-svg reset-styles"/>
                        <span>{link.label}</span>
                    </Link>
                </li>
            )

        })}
        </>

    }

    return <> {navLinks.map((link) => {

        const isActive = pathName === link.href;

        return (
            <li key={link.label}>
                <Link href={link.href}
                      className={isActive ? "d-flex gap-2 active-link active-li" : "d-flex gap-2"}>
                    <ReactSVG src={'/images/' + link.imageName} aria-label={link.label}
                              className="colored-svg reset-styles"/>
                    <span>{link.label}</span>
                </Link>
            </li>
        )

    })}
        {isUserAdmin &&
            <li>
                <Link href="/admin"
                      className={pathName === "/admin" ? "d-flex gap-2 active-link active-li" : "d-flex gap-2"}>
                    <ReactSVG src="/images/admin.svg" className="colored-svg reset-styles"/>
                    <span>Адмін</span>
                </Link>
            </li>
        }
    </>
}