'use server'


import {CategoryForm} from "@/components/admin/categories/edit/CategoryForm";
import {getCategoryAPI} from "@/app/(protected)/admin/categories/category/[uuid]/getCategoryAPI";
import {CategoryRequest} from "@/app/DefaultResponsesInterfaces";


type Props = {
    params: {
        uuid: string;
    }
}

export default async function CategoriesPage({params: {uuid}}: Props) {

    const res = await getCategoryAPI(uuid) as CategoryRequest;
    console.log(res?.category.uuid + " C REQ!!!")

    return (
        <div className="app-content-area d-flex flex-column align-items-center overflow-hidden">
            <div className="main-content p-3 w-95 admin-h">
                {res && <CategoryForm categoryRequest={res} />}
            </div>
        </div>
    );
}