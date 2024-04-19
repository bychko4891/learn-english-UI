'use server'


import {DeleteJwtAccessToken} from "@/app/(protected)/jwtSessionService/DeleteJwtAccessToken";
import {getArticleAPI} from "@/app/(protected)/admin/articles/article/[uuid]/getArticleAPI";
import {ArticleForm} from "@/components/admin/articles/ArticleForm";
import {DictionaryPageForm} from "@/components/admin/dictionary/DictionaryPageForm";
import {
    getDictionaryPageAPI
} from "@/app/(protected)/admin/dictionary-pages/dictionary-page/[uuid]/getDictionaryPageAPI";


type Props = {
    params: {
        uuid: string;
    }
}

export default async function DictionaryPageEditPage({params: {uuid}}: Props) {

    const dictionaryPageResp = await getDictionaryPageAPI(uuid);

    if(dictionaryPageResp) {
        return (
            <div className="app-content-area d-flex flex-column align-items-center overflow-hidden">
                <div className="main-content p-3 w-95 admin-h">
                    <DictionaryPageForm dictionaryPageResp={dictionaryPageResp}/>
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