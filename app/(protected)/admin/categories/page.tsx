import {ButtonBack} from "@/components/admin/ButtonBack";
import {ButtonNewEntity} from "@/components/admin/ButtonNewEntity";
import {getCategoriesAPI} from "@/app/(protected)/admin/categories/getCategoriesAPI";
import {CategoryCategories} from "@/components/admin/categories/CategoryCategories";
import {Categories} from "@/components/admin/categories/Categories";
import {Category} from "@/components/admin/categories/Category";

type Category = {
    uuid: string;
    name: string;
    mainCategory: boolean;
    subcategories: Category[];
}
export default async function CategoriesPage() {

    const res = await getCategoriesAPI();

    const apiRequestURL = "categories/new-category";

    return (
        <div className="app-content-area d-flex flex-column align-items-center">
            <div className="main-content p-3 w-95 admin-h">
                <div className="d-flex justify-content-between top-admin-block">
                    <ButtonBack backURL="/admin"/>
                    <div className="center">
                        <h1>Категорії</h1>
                    </div>
                    <ButtonNewEntity  apiRequestURL={apiRequestURL} redirectURL="/admin/categories/category/"/>
                </div>
                <div className="category-tree d-flex flex-column">

                    {!!res && res.map((category) => (
                        <ul key={category.uuid} className="d-flex">
                            {category.subcategories && category.subcategories.length > 0 ? (
                                <li key={category.uuid}>
                                    <CategoryCategories
                                        key={category.uuid}
                                        categoryName={category.name}
                                        categoryUuid={category.uuid}
                                        categories={<Categories category={category}/>}
                                    />
                                </li>
                            ) : (
                                <li key={category.uuid}>
                                    <Category key={category.uuid} category={category}/>
                                </li>
                            )}
                        </ul>
                    ))}

                </div>
            </div>
        </div>
    );
}