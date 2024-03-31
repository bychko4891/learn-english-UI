import {ButtonBack} from "@/components/admin/ButtonBack";
import Link from "next/link";
import {getAppPagesAPI} from "@/app/(protected)/admin/app-pages/getAppPagesAPI";
import Image from "next/image";

export default async function ApplicationPages() {

    const res = await getAppPagesAPI();

    return (
        <div className="app-content-area d-flex flex-column align-items-center">
            <div className="main-content p-3 w-95 admin-h">
                <div className="d-flex justify-content-between top-admin-block">
                    <ButtonBack backURL="/admin"/>
                    <div className="center">
                        <h1>Сторінки додатка</h1>
                    </div>

                    {/*<ButtonNewEntity  apiRequestURL={apiRequestURL} redirectURL="/admin/app-pages/"/>*/}
                    <Link href="/admin/app-pages/contents" className="right page-nav">Контент сторінок</Link>
                </div>
                <table className="table mt-3">
                    <thead className="table-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">h1</th>

                        <th scope="col">url</th>
                        <th scope="col">#</th>
                    </tr>
                    </thead>
                    <tbody>
                    {!!res && res.map((appPage) => (
                        <tr key={appPage.uuid}>
                            <th scope="row">{appPage.id}</th>
                            <td>{appPage.h1}</td>
                            <td>{appPage.url}</td>
                            <td>
                                <Link href={'/admin/app-pages/' + appPage.uuid}>
                                    <div className="br-g edit-link">
                                        <Image src="/images/edit.svg" width="25" height="25" alt="" className="edit-svg"/>
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