'use client'

import Link from "next/link";
import Image from "next/image";
import {BlackWhiteThemeSwitcher} from "@/components/constantLayout/header/BlackWhiteThemeSwitcher";
import React, {useEffect, useRef, useState} from "react";
import {Category} from "@/app/DefaultResponsesInterfaces";
import {getMainCategories} from "@/components/constantLayout/header/getMainCategories";
import {ProfileMini} from "@/components/images/profile_mini";
import {AppPage} from "@/app/[url]/getAppPageByUrl";
import {getPagesForMenu} from "@/components/constantLayout/header/getPagesForMenu";

export const Header = () => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [pages, setPages] = useState<AppPage[]>([]);

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
            const [categories, pages] = await Promise.all([
                getMainCategories(),
                getPagesForMenu(),
            ]);
            if(categories.ok) setCategories(categories.ok);
            if(pages.ok) setPages(pages.ok);
        })()
    }, []);

    function getCategoryLink(categoryPage: string): string {
        switch (categoryPage) {
            case "DICTIONARY_PAGE" : return "/dictionary";
            case "LESSON_WORDS" : return "/vocabulary";
            case "ARTICLES" : return "/articles";
            default: return "#";
        }
    }

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
                        <ul className="d-flex gap-4">
                            {categories && categories.length > 0 && categories.map((c) => {
                                return(
                                    <li key={c.uuid}>
                                        <Link href={getCategoryLink(c.categoryPage)} className="m-link" >
                                            <span>{c.name}</span>
                                        </Link>

                                    </li>
                                );
                            })}
                            {pages && pages.length > 0 && pages.map((p) => {
                                return(
                                    <li key={p.uuid} >
                                        <Link href={"/" + p.url} className="m-link" >
                                            <span>{p.seoObject.h1}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
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
    );
};