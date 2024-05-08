'use server'

import "./categories.style.css";
import {OneCategory} from "./OneCategory";
import {CategoryAndSubcategories} from "@/components/admin/categories/CategoryAndSubcategories";
import {Category} from "@/app/DefaultResponsesInterfaces";


export const Categories = ({category}: { category: Category }) => {


    return ( <> {category.subcategories.map((subcategory) => (

                <li key={subcategory.uuid}>
                    {subcategory.subcategories && subcategory.subcategories.length > 0 ? (
                        <CategoryAndSubcategories
                            categoryName={subcategory.name}
                            sortOrder={subcategory.sortOrder}
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