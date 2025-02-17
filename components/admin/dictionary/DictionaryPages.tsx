'use client'

import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import { Pagination } from "@/app/DefaultResponsesInterfaces";
import {DeleteJwtAccessToken} from "@/app/(protected)/jwtSessionService/DeleteJwtAccessToken";
import {NoContent} from "@/components/noContent/NoContent";
import {getDictionaryPages, SimpleDictionaryPage} from "@/app/(protected)/admin/dictionary-pages/getDictionaryPages";
import {PaginationComponent} from "@/components/pagination/PaginationComponent";
import {useSearchParams} from "next/navigation";

export const DictionaryPages = () => {

    const searchParams = useSearchParams();
    const [dictionaryPages, setDictionaryPages] = useState<SimpleDictionaryPage[]>();
    const [pagination, setPagination] = useState<Pagination>();
    const [error, setError] = useState<Error>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getDictionaryPages({
                    searchQuery: searchParams.get("searchQuery")?.toString(),
                    sort: searchParams.get("sort")?.toString(),
                    page: searchParams.get("page")?.toString(),
                    size: searchParams.get("size")?.toString(),
                });
                if (res.ok) {
                    setDictionaryPages(res.ok.t);
                    const pagination = {
                        totalPages: res.ok.totalPages,
                    } as Pagination
                    setPagination(pagination);
                } else setError(new Error());
            } catch (error) {
                setError(new Error());
            }
        };
        fetchData();
    }, [error, searchParams]);


    if (!error) {
        return (
            <>
                <table className="table mt-3">
                    <thead className="table-dark">
                    <tr>
                        <th scope="col">Ім`я</th>
                        <th scope="col">Категорія</th>
                        <th scope="col">Опубліковано</th>
                        <th scope="col">#</th>
                    </tr>
                    </thead>
                    <tbody>
                    {!!dictionaryPages && dictionaryPages.length > 0 && dictionaryPages.map((dictionaryPage) => (
                        <tr key={dictionaryPage.uuid}>
                            <th scope="row">{dictionaryPage.name}</th>
                            <td>{dictionaryPage.categoryName}</td>
                            <td>{dictionaryPage.published ? "Так" : "Ні"}</td>
                            <td>
                                <Link href={'/admin/dictionary-pages/dictionary-page/' + dictionaryPage.uuid}>
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
                {pagination && <PaginationComponent pagination={pagination} />}
            </>
        );
    }
    return (
        <>
            <NoContent/>
            <DeleteJwtAccessToken/>

        </>
    );
};