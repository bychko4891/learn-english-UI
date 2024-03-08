'use client'

import Link from "next/link";
import { usePathname} from "next/navigation";
import {ReactSVG} from 'react-svg';
import "./style.css";

type NavLink = {
    label: string,
    href: string,
    imageName: string
}

type Props = {
    navLinks: NavLink[];
}
export const Navigation = ({ navLinks }: Props) => {

    const pathName = usePathname();
    return <> {navLinks.map((link) => {

        const isActive = pathName === link.href;

        return(
            <li key={link.label} >
                <Link href={link.href}
                      className={isActive ? "d-flex gap-2 active-link active-li" : "d-flex gap-2"} >
                    <ReactSVG src={'/images/' + link.imageName} aria-label={link.label} className="colored-svg reset-styles" />
                    <span>{link.label}</span>
                </Link>
            </li>
        )
    })}
    </>
}