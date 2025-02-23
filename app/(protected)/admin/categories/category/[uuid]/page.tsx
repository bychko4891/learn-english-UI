'use server'

import {CategoryForm} from "@/components/admin/categories/edit/CategoryForm";
import {getCategory} from "@/app/(protected)/admin/categories/category/[uuid]/getCategory";
import {CategoryResponse} from "@/app/DefaultResponsesInterfaces";
import {DeleteJwtAccessToken} from "@/app/(protected)/jwtSessionService/DeleteJwtAccessToken";
import {NoContent} from "@/components/noContent/NoContent";

type Props = {
    params: {
        uuid: string;
    }
}

export default async function CategoryEditPage({params: {uuid}}: Props) {

    const res = await getCategory(uuid);

    if(res.ok) {
        return (
            <div className="app-content-area d-flex flex-column align-items-center overflow-hidden">
                <div className="main-content p-3 w-95 admin-h">
                     <CategoryForm category={res.ok}/>
               </div>
            </div>
        );
    }

    return (
        <>
            <NoContent error={ res.err ? res.err : ""} />
        </>
    );
}