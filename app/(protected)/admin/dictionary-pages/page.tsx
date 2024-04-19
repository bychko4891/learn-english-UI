import {ButtonBack} from "@/components/admin/ButtonBack";
import {ButtonNewEntity} from "@/components/admin/ButtonNewEntity";
import {DictionaryPages} from "@/components/admin/dictionary/DictionaryPages";


export default async function DictionaryPage() {

    return (
        <div className="app-content-area d-flex flex-column align-items-center">
            <div className="main-content p-3 w-95 admin-h">
                <div className="d-flex justify-content-between top-admin-block">
                    <ButtonBack backURL="/admin"/>
                    <div className="center">
                        <h1>Сторінки словника</h1>
                    </div>

                    <div className="right d-flex gap-3">
                        <ButtonNewEntity apiRequestURL="/new-dictionary-page" redirectURL="/admin/dictionary-pages/dictionary-page/"/>
                    </div>
                </div>
                <DictionaryPages/>
            </div>
        </div>
    );
}