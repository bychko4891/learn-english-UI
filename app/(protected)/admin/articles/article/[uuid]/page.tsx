'use server'


import {DeleteJwtAccessToken} from "@/app/(protected)/jwtSessionService/DeleteJwtAccessToken";
import {getArticleAPI} from "@/app/(protected)/admin/articles/article/[uuid]/getArticleAPI";
import {ArticleResponse} from "@/app/DefaultResponsesInterfaces";
import {ArticleForm} from "@/components/admin/articles/ArticleForm";


type Props = {
    params: {
        uuid: string;
    }
}

export default async function ArticleEditPage({params: {uuid}}: Props) {

    const article = await getArticleAPI(uuid) as ArticleResponse;

    if(article) {
        return (
            <div className="app-content-area d-flex flex-column align-items-center overflow-hidden">
                <div className="main-content p-3 w-95 admin-h">
                    <ArticleForm articleResponse={article}/>
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