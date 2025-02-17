'use client'

import {getAppPagesAPI, SimpleAppPage} from "@/app/(protected)/admin/app-pages/getAppPagesAPI";
import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import {DeleteJwtAccessToken} from "@/app/(protected)/jwtSessionService/DeleteJwtAccessToken";
import {NoContent} from "@/components/noContent/NoContent";

export const AppPages = () => {

    const [appPages, setAppPages] = useState<SimpleAppPage[]>([]);
    const [error, setError] = useState<Error>();


    useEffect(() => {
        (async () => {
            try {
                const res = await getAppPagesAPI();
                if (res.ok) {
                    setAppPages(res.ok.t);
                }
                else setError(new Error());
            } catch (error) {
                setError(new Error());
            }
        })()
    }, []);

    if (appPages) {
        return (
            <table className="table mt-3">
                <thead className="table-dark">
                <tr>
                    <th scope="col">url</th>
                    <th scope="col">h1</th>
                    <th scope="col">#</th>
                </tr>
                </thead>
                <tbody>
                {!!appPages && appPages.length > 0 && appPages.map((appPage) => (
                    <tr key={appPage.uuid}>
                        <th scope="row">{appPage.url}</th>
                        <td>{appPage.seoObject.h1 || ""}</td>
                        <td>
                            <Link href={'/admin/app-pages/' + appPage.uuid}>
                                <div className="br-g edit-link">
                                    <Image unoptimized src="/images/edit.svg" width="25" height="25" alt=""
                                           className="edit-svg"/>
                                </div>
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }
    return (
        <>
            <NoContent/>
            <DeleteJwtAccessToken/>
        </>
    );
};