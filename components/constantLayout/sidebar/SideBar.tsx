'use server'

import {Logo} from "@/components/constantLayout/sidebar/Logo";
import {Navigation} from "@/components/constantLayout/sidebar/Navigation";

export const SideBar = () => {

    const navItemsUser = [
        {label: "Головна", href: "/", imageName: "home.svg"},
        {label: "Вправи по фразам", href:"#", imageName: "lesson.svg"},
        {label: "Вправи по словам", href:"/word-lessons", imageName: "word-card.svg"},
        {label: "Словник", href:"/dictionary", imageName: "dictionary.svg"},
        {label: "Міні історії", href:"/mini-stories", imageName: "mini-stories.svg"},
        {label: "Про нас", href:"/about", imageName: "info.svg"},
        {label: "Задонатити", href:"", imageName: "donate.svg"}

    ];

    const navItemsAdmin = [
        {label: "Юзери", href: "/admin/users", imageName: "users.svg"},
        {label: "Заняття по словам", href:"/admin/word-lessons", imageName: "lessons.svg"},
        {label: "Заняття по фразам", href:"#", imageName: "lessons.svg"},
        {label: "Сторінки додатка", href:"/admin/app-pages", imageName: "pages.svg"},
        {label: "Категорії", href:"/admin/categories", imageName: "category.svg"},
        {label: "Міні історії", href:"/mini-stories", imageName: "mini-stories.svg"},
        {label: "Слова", href:"/admin/words", imageName: "words.svg"},
        {label: "Сторінки словника", href:"/admin/dictionary-pages", imageName: "dictionary.svg"},
        {label: "Статті", href:"/admin/articles", imageName: "articles.svg"},
        {label: "Юзер інтерфес", href:"/user/profile", imageName: "user-interface.svg"}

    ];

    return (
        <div className="app-menu">
            <div className="navbar-vertical navbar nav-dashboard" style={{zIndex: 2, overflow: "auto"}} >
                <div className="h-100">
                    <Logo />
                    <div className="sidebar navbar-nav flex-column">
                        <ul className="main-menu">
                            <Navigation navLinks={navItemsUser} navLinksAdmin={navItemsAdmin}/>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};