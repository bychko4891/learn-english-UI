'use client'

import {getAppPagesAPI} from "@/app/(protected)/admin/app-pages/getAppPagesAPI";
import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import {AppPage} from "@/app/DefaultResponsesInterfaces";
import {DeleteJwtAccessToken} from "@/app/(protected)/jwtSessionService/DeleteJwtAccessToken";
import {NoContent} from "@/components/noContent/NoContent";

export const AppPages = () => {

    const [appPages, setAppPages] = useState<AppPage[]>();
    const [error, setError] = useState<Error>();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAppPagesAPI();
                if (res) setAppPages(res as AppPage[]);
                else setError(new Error());
            } catch (error) {
                setError(new Error());
            }
        };
        fetchData();
    }, [error]);

    if (!error) {
        return (
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
                {!!appPages && appPages.length > 0 && appPages.map((appPage) => (
                    <tr key={appPage.uuid}>
                        <th scope="row">{appPage.id}</th>
                        <td>{appPage.h1}</td>
                        <td>{appPage.url}</td>
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