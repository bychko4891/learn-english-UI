'use client'

import Link from "next/link";
import Image from "next/image";
import {BlackWhiteThemeSwitcher} from "@/components/constantLayout/header/BlackWhiteThemeSwitcher";
import React, {useEffect, useRef, useState} from "react";
import {Category} from "@/app/DefaultResponsesInterfaces";
import {getMainCategories} from "@/components/constantLayout/header/getMainCategories";
import {ProfileMini} from "@/components/images/profile_mini";

export const Header = () => {

    const [categories, setCategories] = useState<Category[]>([]);

    const [isHidden, setIsHidden] = useState(false);
    const lastScrollTop = useRef(0);
    const scrollUpThreshold = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (currentScroll < 400) {
                setIsHidden(false);
                return;
            }
            if (currentScroll > lastScrollTop.current) {
                setIsHidden(true);
                scrollUpThreshold.current = currentScroll - 300;
            }
            else if (currentScroll < scrollUpThreshold.current) {
                setIsHidden(false);
            }

            lastScrollTop.current = currentScroll;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        (async () => {
            const res = await getMainCategories();
            if(res.ok) setCategories(res.ok);
        })()
    }, []);

    return (
        <header className={(isHidden ? "header-hidden " : "header-visible ") + "menu mb-0 position-sticky top-0 z-3"} style={{backgroundColor: "var(--dashui-header-bg)", height: 80, backdropFilter: "blur(20px)", transition: "transform 0.5s ease-out"}}>
            <div className="w-100 position-relative z-3" style={{top: "1.5rem"}}>
                <div className="row align-center">
                    <div className="col-3 position-absolute" style={{left: "3%"}}>
                        <Link className="navbar-brand d-flex flex-row" href="/">
                            <Image unoptimized src="/images/logo.png" alt="Learn English" width={32.4} height={30}/>
                            <div className="logo">
                                <span className="danger">English</span><span>Learn</span>
                            </div>
                        </Link>
                    </div>
                    <nav className="mx-auto position-absolute d-none d-xl-block" style={{left: "50%", transform: "translateX(-50%)"}}>
                        <ul className="d-flex gap-4" style={{color: "var(--dashui-gray-900)"}}>
                            {categories && categories.length > 0 && categories.map((c) => {
                                return(
                                    <li key={c.uuid}>{c.name}</li>
                                );
                            })}
                            {/*<li>Kkgjkfdgjdfk </li>*/}
                            {/*<li>Kkgjkfdgjdfk </li>*/}
                            {/*<li>Kkgjkfdgjdfk </li>*/}
                        </ul>

                        {/*<ul className="" style={{marginBottom: 0, paddingLeft: 0, display: "block"}}>*/}
                        {/*    <li className="">*/}
                        {/*        <a className="" aria-current="page" href="#">Home</a>*/}
                        {/*    </li>*/}
                        {/*    <li className="">*/}
                        {/*        <a className="" href="#">Link</a>*/}
                        {/*    </li>*/}
                        {/*    <li className="nav-item dropdown">*/}
                        {/*        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"*/}
                        {/*           data-toggle="dropdown" aria-expanded="false">*/}
                        {/*            Dropdown*/}
                        {/*        </a>*/}
                        {/*        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">*/}
                        {/*            <li><a className="dropdown-item" href="#">Action</a></li>*/}
                        {/*            <li><a className="dropdown-item" href="#">Another action</a></li>*/}
                        {/*            <li>*/}
                        {/*                <hr className="dropdown-divider"/>*/}
                        {/*            </li>*/}
                        {/*            <li><a className="dropdown-item" href="#">Something else here</a></li>*/}
                        {/*        </ul>*/}
                        {/*    </li>*/}
                        {/*    <li className="nav-item">*/}
                        {/*        <a className="nav-link disabled" href="#" tabIndex="-1"*/}
                        {/*           aria-disabled="true">Disabled</a>*/}
                        {/*    </li>*/}
                        {/*</ul>*/}
                    </nav>
                    <div className="d-flex col-3 align-center position-absolute" style={{right: "3%"}}>
                        <BlackWhiteThemeSwitcher />
                        <Link className="h-link-s-in" href="/login" >
                            <div className="h-link-s-in-svg"><ProfileMini/></div>
                            <span>Увійти</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>


//     <div className="col-12">
        // <nav className="navbar navbar-expand-lg navbar-light bg-light">
        // <div className="container-fluid">
        // <a className="navbar-brand" href="#">Navbar</a>
        // <button className="navbar-toggler" type="button" data-toggle="collapse"
        //                     data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
        //                     aria-expanded="false" aria-label="Toggle navigation">
        //                 <span className="navbar-toggler-icon"></span>
        //             </button>
        //             <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //                 <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
        //                     <li className="nav-item">
        //                         <a className="nav-link active" aria-current="page" href="#">Home</a>
        //                     </li>
        //                     <li className="nav-item">
        //                         <a className="nav-link" href="#">Link</a>
        //                     </li>
        //                     <li className="nav-item dropdown">
        //                         <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
        //                            data-toggle="dropdown" aria-expanded="false">
        //                             Dropdown
        //                         </a>
        //                         <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
        //                             <li><a className="dropdown-item" href="#">Action</a></li>
        //                             <li><a className="dropdown-item" href="#">Another action</a></li>
        //                             <li>
        //                                 <hr className="dropdown-divider"/>
        //                             </li>
        //                             <li><a className="dropdown-item" href="#">Something else here</a></li>
        //                         </ul>
        //                     </li>
        //                     <li className="nav-item">
        //                         <a className="nav-link disabled" href="#" tabIndex="-1"
        //                            aria-disabled="true">Disabled</a>
        //                     </li>
        //                 </ul>
        //                 <form className="d-flex">
        //                     <input className="form-control mr-2" type="search" placeholder="Search"
        //                            aria-label="Search"/>
        //                     <button className="btn btn-outline-success" type="submit">Search</button>
        //                 </form>
        //             </div>
        //         </div>
        //     </nav>
        // </div>
    );
};