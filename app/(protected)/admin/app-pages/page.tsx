import {ButtonBack} from "@/components/admin/ButtonBack";
import {ButtonNewEntity} from "@/components/admin/ButtonNewEntity";
import Link from "next/link";
import {AppPages} from "@/components/admin/app-pages/AppPages";

export default async function ApplicationPages() {


    return (
        <div className="app-content-area d-flex flex-column align-items-center">
            <div className="main-content p-3 w-95 admin-h">
                <div className="d-flex justify-content-between top-admin-block">
                    <ButtonBack backURL="/admin"/>
                    <div className="center">
                        <h1>Сторінки додатка</h1>
                    </div>

                    <div className="right d-flex gap-3">
                    <ButtonNewEntity  apiRequestURL="/app-page/new" redirectURL="/admin/app-pages/"/>
                    <Link href="/admin/app-pages/contents" className="right page-nav">Контент сторінок</Link>
                    </div>
                </div>
                <AppPages />
            </div>
        </div>
    );
}



// export const getServerSideProps = (async (context) => {
//     // const res = await fetch("https://...");
//     const appPages = await getAppPagesAPI();
//     return { props: { appPages } };
// }) satisfies GetServerSideProps<{
//     appPages: AppPage[];
// }>;