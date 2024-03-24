'use client'


import Link from "next/link";
import {ReactSVG} from "react-svg";

type NavLink = {
    label: string;
    href: string;
    imageName: string;
    navColor: string;
}
type Props = {
    navLinks: NavLink[];
}
export const MainNavigation = ({navLinks}: Props) => {


    return <> {navLinks.map((link) => {

        return (
            <li key={link.label}>
                <Link href={link.href} className="d-flex gap-2">
                    <div className="navigation_admin_page bb col-md-4 col-lg-4" style={{backgroundColor: link.navColor}}>
                        <div className="d-flex flex-row align-items-center">
                            <div className="w-25">
                                <ReactSVG beforeInjection={(svg) => {
                                    svg.setAttribute('style', 'width: 40px')
                                    svg.setAttribute('style', 'height: 40px')
                                }} src={"/images/" + link.imageName} aria-label={link.label} className="colored-svg reset-styles" />
                            </div>
                            <div className="w-75">
                                <span>{link.label}</span>
                            </div>
                        </div>

                    </div>
                </Link>
            </li>
        )

    })}
    </>
};