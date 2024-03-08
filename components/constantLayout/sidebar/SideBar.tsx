'use server'

import {Logo} from "@/components/constantLayout/sidebar/Logo";
import {Navigation} from "@/components/constantLayout/sidebar/Navigation";

export const SideBar = () => {

    const navItems = [
        {label: "Головна", href: "/", imageName: "home.svg"},
        {label: "Вправи по фразам", href:"#", imageName: "lesson.svg"},
        {label: "Вправи по словам", href:"#", imageName: "word-card.svg"},
        {label: "Словник", href:"/vocabulary", imageName: "vocabulary.svg"},
        {label: "Міні історії", href:"/mini-stories", imageName: "mini-stories.svg"},
        {label: "Про нас", href:"/about", imageName: "info.svg"},
        {label: "Задонатити", href:"", imageName: "donate.svg"}

    ];

    return (
        <div className="app-menu">
            <div className="navbar-vertical navbar nav-dashboard" style={{zIndex: 2}} >
                <div className="h-100">
                    <Logo />
                    <div className="sidebar navbar-nav flex-column">
                        <ul className="main-menu">
                            <Navigation navLinks={navItems}/>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};