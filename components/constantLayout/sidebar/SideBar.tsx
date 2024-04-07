'use server'

import {Logo} from "@/components/constantLayout/sidebar/Logo";
import {Navigation} from "@/components/constantLayout/sidebar/Navigation";

export const SideBar = () => {

    const navItemsUser = [
        {label: "Головна", href: "/", imageName: "home.svg"},
        {label: "Вправи по фразам", href:"#", imageName: "lesson.svg"},
        {label: "Вправи по словам", href:"#", imageName: "word-card.svg"},
        {label: "Словник", href:"/vocabulary", imageName: "vocabulary.svg"},
        {label: "Міні історії", href:"/mini-stories", imageName: "mini-stories.svg"},
        {label: "Про нас", href:"/about", imageName: "info.svg"},
        {label: "Задонатити", href:"", imageName: "donate.svg"}

    ];

    const navItemsAdmin = [
        {label: "Юзери", href: "/admin", imageName: "users.svg"},
        {label: "Заняття", href:"#", imageName: "lessons.svg"},
        {label: "Сторінки додатка", href:"/admin/app-pages", imageName: "pages.svg"},
        {label: "Категорії", href:"/admin/categories", imageName: "category.svg"},
        {label: "Міні історії", href:"/mini-stories", imageName: "mini-stories.svg"},
        {label: "Слова", href:"/about", imageName: "words.svg"},
        {label: "Статті", href:"/admin/articles", imageName: "articles.svg"},
        {label: "Юзер інтерфес", href:"/user/profile", imageName: "user-interface.svg"}

    ];

    return (
        <div className="app-menu">
            <div className="navbar-vertical navbar nav-dashboard" style={{zIndex: 2}} >
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