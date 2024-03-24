

import {getCategoriesAPI} from "@/app/(protected)/admin/categories/getCategoriesAPI";
import {CategoryForm} from "@/components/admin/categories/save/CategoryForm";


type Props = {
    params: {
        uuid: string;
    }
}

export default async function CategoriesPage({params: {uuid}}: Props) {

    const res = await getCategoriesAPI();

    return (
        <div className="app-content-area d-flex flex-column align-items-center">
            <div className="main-content p-3 w-95 admin-h">
                <CategoryForm />
            </div>
        </div>
    );
}