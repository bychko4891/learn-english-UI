'use client';

import React, {useState, useEffect} from 'react';
import { getCookie, setCookie } from 'cookies-next';


export const BlackWhiteThemeSwitcher = () => {


    let prefersDarkMode = false;

    if (typeof window !== 'undefined') {
        prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }


    const [theme, setTheme] = useState(() => {
        const themeCookie =  getCookie('theme');
        if (!themeCookie) {
            return prefersDarkMode ? "dark" : "light";
        } else {
            return themeCookie.toString() ? themeCookie.toString() : "light";
        }

    });


    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);


    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);


    const switchTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        setCookie('theme', newTheme, {
            maxAge:60 * 60 * 24 * 365,
            path: '/'
        } )
        setTheme(newTheme);
    };


    return (
        <>
            {domLoaded && (
                <li>
                    <a href="#" className="form-check form-switch theme-switch btn btn-ghost btn-icon rounded-circle mb-0 ">
                        <input className="form-check-input" type="checkbox" role="switch" checked={theme === "dark"}
                               onChange={switchTheme}/>
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
                    </a>
                </li>
            )}
        </>
    );
}
