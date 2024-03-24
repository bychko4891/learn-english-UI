import {ButtonBack} from "@/components/admin/categories/ButtonBack";
import {ButtonNewCategory} from "@/components/admin/categories/ButtonNewCategory";
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

    return (
        <div className="app-content-area d-flex flex-column align-items-center">
            <div className="main-content p-3 w-95 admin-h">
                <div className="d-flex justify-content-between top-admin-block">
                    <ButtonBack/>
                    <div className="center">
                        <h1>Категорії</h1>
                    </div>
                    <ButtonNewCategory/>
                </div>
                <div className="category-tree d-flex flex-column">

                    {!!res && res.map((category) => (
                        <>
                            {category.subcategories && category.subcategories.length > 0 ? (
                                <ul key={category.uuid}>
                                    <CategoryCategories
                                        key={category.uuid}
                                        categoryName={category.name}
                                        categoryUuid={category.uuid}
                                        categories={<Categories category={category}/>}
                                    />
                                </ul>
                            ) : (
                                <ul key={category.uuid}>
                                    <Category key={category.uuid} category={category}/>
                                </ul>
                            )}
                        </>
                    ))}

                </div>
            </div>
        </div>
    );
}