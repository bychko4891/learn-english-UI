'use server'

import {ButtonBack} from "@/components/admin/ButtonBack";
import {ButtonNewEntity} from "@/components/admin/ButtonNewEntity";
import {getCategoriesAPI} from "@/app/(protected)/admin/categories/getCategoriesAPI";
import {CategoryAndSubcategories} from "@/components/admin/categories/CategoryAndSubcategories";
import {Categories} from "@/components/admin/categories/Categories";
import {OneCategory} from "@/components/admin/categories/OneCategory";
import {DeleteJwtAccessToken} from "@/app/(protected)/jwtSessionService/DeleteJwtAccessToken";
import {GetServerSidePropsContext} from "next";
import {fetchWithToken} from "@/app/fetchWithToken";
import {env} from "@/env.mjs";
import {Category} from "@/app/DefaultResponsesInterfaces";
import {getJwtAccessToken} from "@/app/(protected)/jwtSessionService/authTokenHandler";


// export async function getServerSideProps(context: GetServerSidePropsContext) {
//     // Виконати запит до віддаленого сервера для отримання оновлених даних
//     const categories = await getCategoriesAPI();
//     const data = await res.json();
//
//     // Повернути отримані дані як пропси для компонента
//     return {
//         props: {
//             data,
//         },
//     };
// }


export default async function CategoriesPage() {


    const accessToken = await getJwtAccessToken();
    const resp = await fetch(env.SERVER_API_URL + '/api/admin/categories', {
        method: 'GET',
        next: { revalidate: 0 },
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }

    });

    const categories = await resp?.json() as Category[]
    const apiRequestURL = "/categories/new-category";

    if (categories) {
        return (
            <div className="app-content-area d-flex flex-column align-items-center overflow-hidden">
                <div className="main-content p-3 w-95 admin-h">
                    <div className="d-flex justify-content-between top-admin-block">
                        <ButtonBack backURL="/admin"/>
                        <div className="center">
                            <h1>Категорії</h1>
                        </div>
                        <ButtonNewEntity apiRequestURL={apiRequestURL} redirectURL="/admin/categories/category/"/>
                    </div>
                    <div className="block-form d-flex flex-column">


                        {categories.length > 0 && categories.map((category) => (
                            <ul key={category.uuid} className="d-flex">
                                {category.subcategories && category.subcategories.length > 0 ? (
                                    <li key={category.uuid}>
                                        <CategoryAndSubcategories
                                            key={category.uuid}
                                            sortOrder={category.sortOrder}
                                            categoryName={category.name}
                                            categoryUuid={category.uuid}
                                            categories={<Categories category={category}/>}
                                        />
                                    </li>
                                ) : (
                                    <li key={category.uuid}>
                                        <OneCategory key={category.uuid} category={category}/>
                                    </li>
                                )}
                            </ul>
                        ))}

                    </div>
                </div>
            </div>
        );
    }
    return (
        <>
            <DeleteJwtAccessToken/>
        </>
    );
}

CategoriesPage.getInitialProps = async (context: GetServerSidePropsContext) => {
    const res = await fetch("https://api.com");
    const data = await res.json();

    return { data }; // this will be passed to the page component as props
};
