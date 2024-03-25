'use server'

import "./categories.style.css";
import {Category} from "./Category";
import {CategoryCategories} from "@/components/admin/categories/CategoryCategories";

type Category = {
    uuid: string;
    name: string;
    mainCategory: boolean;
    subcategories: Category[];
}

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
                        <Category category={subcategory}/>
                    )}
                </li>
            ))
            }
        </>
    );

};