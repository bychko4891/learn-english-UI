import {MainNavigation} from "@/components/admin/MainNavigation";
import {SaveUserForContext} from "@/components/user/profile/SaveUserForContext";
import {DeleteJwtAccessToken} from "@/app/(protected)/jwtSessionService/DeleteJwtAccessToken";
import {getAdminAPI} from "@/app/(protected)/admin/admin/getAdminAPI";

export default async function AdminMainPage() {

    // const admin = await getAdminAPI();


    const navItems = [
        {label: "Юзери", href: "/", imageName: "users.svg", navColor: "rgba(116, 21, 45, 0.9)"},
        {label: "Заняття", href: "#", imageName: "lessons.svg", navColor: "rgba(84, 57, 172, 0.9)"},
        {label: "Сторінки додатка", href: "/admin/app-pages", imageName: "pages.svg", navColor: "rgba(20, 139, 127, 0.9)"},
        {label: "Категорії", href: "/admin/categories", imageName: "category.svg", navColor: "rgba(215, 97, 13, 0.9)"},
        {
            label: "Матеріали додатка",
            href: "#",
            imageName: "materials.svg",
            navColor: "rgba(45, 45, 52, 0.9)"
        }
    ];

    // if (admin) {
        return (
            <>
                {/*<SaveUserForContext user={admin}/>*/}
                <div className="app-content-area d-flex flex-column align-items-center">
                    <div className="w-95">
                        <div className="navigation-block row justify-content-between">
                            <MainNavigation navLinks={navItems}/>
                        </div>
                    </div>

                    <div className="main-content p-3 w-95">
                        <h1>AdminMainPage</h1>
                        {/*<Edit />*/}
                    </div>
                </div>
            </>
        );
    // } else {
    //     return (
    //         <>
    //             <DeleteJwtAccessToken/>
    //         </>
    //     );
    // }

}