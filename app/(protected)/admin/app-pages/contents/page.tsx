import {ButtonBack} from "@/components/admin/ButtonBack";
import {ButtonNewEntity} from "@/components/admin/ButtonNewEntity";
import {getAppPagesContents} from "@/app/(protected)/admin/app-pages/contents/getAppPagesContetntsAPI";
import Link from "next/link";
import Image from "next/image";


export default async function ApplicationPage() {

    const res = await getAppPagesContents();

    return (
        <div className="app-content-area d-flex flex-column align-items-center">
            <div className="main-content p-3 w-95 admin-h">
                <div className="d-flex justify-content-between top-admin-block">
                    <ButtonBack backURL="/admin/app-pages"/>
                    <div className="center">
                        <h1>Контент сторінок</h1>
                    </div>
                    <ButtonNewEntity apiRequestURL="/page-content/new"
                                     redirectURL="/admin/app-pages/contents/"/>
                </div>
                <table className="table mt-3">
                    <thead className="table-dark">
                    <tr>
                        {/*<th scope="col">ID</th>*/}
                        <th scope="col">Ім`я</th>
                        <th scope="col">Позиція</th>
                        <th scope="col">url</th>
                        <th scope="col">#</th>
                    </tr>
                    </thead>
                    <tbody>
                    {res.ok?.t && res.ok.t.map((pageContent) => (
                        <tr key={pageContent.uuid}>
                            <th scope="row">{pageContent.name}</th>
                            <td>{pageContent.position}</td>
                            <td>{pageContent.applicationPageUrl}</td>
                            <td>
                                <Link href={'/admin/app-pages/contents/' + pageContent.uuid} >
                                    <div className="br-g edit-link">
                                        <Image unoptimized src="/images/edit.svg" width="25" height="25" alt="" className="edit-svg"/>
                                    </div>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}