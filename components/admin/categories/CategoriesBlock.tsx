'use client'

// import {CategoryCategories} from "@/components/admin/categories/CategoryCategories";
// import {Categories} from "@/components/admin/categories/Categories";
// import {OneCategory} from "@/components/admin/categories/OneCategory";
import {useEffect, useState} from "react";
import {Category} from "@/app/DefaultResponsesInterfaces";
import {getCategoriesAPI} from "@/app/(protected)/admin/categories/getCategoriesAPI";
import {DeleteJwtAccessToken} from "@/app/(protected)/jwtSessionService/DeleteJwtAccessToken";

export const CategoriesBlock = () => {

    const [categories, setCategories] = useState<Category[]>();

    useEffect(() => {
        const getCategories = async () => {
            const categories = await getCategoriesAPI();
            if (categories) setCategories(categories);
        }
        getCategories();
    }, []);

    if (categories) {

        return (
            <>
                {categories.length > 0 && categories.map((category) => (
                    <></>
                    // <ul key={category.uuid} className="d-flex">
                    //     {category.subcategories && category.subcategories.length > 0 ? (
                    //         <li key={category.uuid}>
                    //             <CategoryCategories
                    //                 // key={category.uuid}
                    //                 categoryName={category.name}
                    //                 categoryUuid={category.uuid}
                    //                 categories={<Categories category={category}/>}
                    //             />
                    //         </li>
                    //     ) : (
                    //         <li key={category.uuid}>
                    //             <OneCategory key={category.uuid} category={category}/>
                    //         </li>
                    //     )}
                    // </ul>
                ))}
            </>
        );
    }
        return (
            <>
                <DeleteJwtAccessToken/>
            </>
        );


}