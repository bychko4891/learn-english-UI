import {ButtonBack} from "@/components/admin/ButtonBack";
import {ButtonNewEntity} from "@/components/admin/ButtonNewEntity";
import {Articles} from "@/components/admin/articles/Articles";


export default async function ArticlesPage() {

    return (
        <div className="app-content-area d-flex flex-column align-items-center">
            <div className="main-content p-3 w-95 admin-h">
                <div className="d-flex justify-content-between top-admin-block">
                    <ButtonBack backURL="/admin"/>
                    <div className="center">
                        <h1>Статті додатка</h1>
                    </div>

                    <div className="right d-flex gap-3">
                        <ButtonNewEntity apiRequestURL="/articles/new-article" redirectURL="/admin/articles/article/"/>
                    </div>
                </div>
                <Articles/>
            </div>
        </div>
    );
}