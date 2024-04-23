'use server'

import "./categories.style.css";
import {OneCategory} from "./OneCategory";
import {CategoryCategories} from "@/components/admin/categories/CategoryCategories";
import {Category} from "@/app/DefaultResponsesInterfaces";


export const Categories = ({category}: { category: Category }) => {


    return ( <> {category.subcategories.map((subcategory) => (

                <li key={subcategory.uuid}>
                    {subcategory.subcategories && subcategory.subcategories.length > 0 ? (
                        <CategoryCategories
                            categoryName={subcategory.name}
                            categoryUuid={subcategory.uuid}
                            categories={<Categories category={subcategory}/>}
                        />
                    ) : (
                        <OneCategory category={subcategory}/>
                    )}
                </li>
            ))
            }
        </>
    );

};