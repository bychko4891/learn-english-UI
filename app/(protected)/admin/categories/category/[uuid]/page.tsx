'use server'


import {CategoryForm} from "@/components/admin/categories/edit/CategoryForm";
import {getCategoryAPI} from "@/app/(protected)/admin/categories/category/[uuid]/getCategoryAPI";
import {CategoryResponse} from "@/app/DefaultResponsesInterfaces";
import {DeleteJwtAccessToken} from "@/app/(protected)/jwtSessionService/DeleteJwtAccessToken";


type Props = {
    params: {
        uuid: string;
    }
}

export default async function CategoryEditPage({params: {uuid}}: Props) {

    const category = await getCategoryAPI(uuid);

    if(category) {
        return (
            <div className="app-content-area d-flex flex-column align-items-center overflow-hidden">
                <div className="main-content p-3 w-95 admin-h">
                    <CategoryForm categoryResponse={category}/>
                </div>
            </div>
        );
    }

    return (
        <>
            <DeleteJwtAccessToken />
        </>
    );
}