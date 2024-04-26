'use client'

import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import {DictionaryPage, Pagination, Word} from "@/app/DefaultResponsesInterfaces";
import {DeleteJwtAccessToken} from "@/app/(protected)/jwtSessionService/DeleteJwtAccessToken";
import {NoContent} from "@/components/noContent/NoContent";
import {getDictionaryPagesAPI} from "@/app/(protected)/admin/dictionary-pages/getDictionaryPagesAPI";
import {PaginationComponent} from "@/components/admin/PaginationComponent"


export const DictionaryPages = () => {

    const [dictionaryPages, setDictionaryPages] = useState<DictionaryPage[]>();
    const [nextPage, setNextPage] = useState<number>(0);
    const [size, setSize] = useState<number>(25);
    const [pagination, setPagination] = useState<Pagination>();
    const [error, setError] = useState<Error>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getDictionaryPagesAPI(nextPage, size);
                if (res) {
                    setDictionaryPages(res.t);
                    const pagination = {totalPages: res.totalPages, currentPage: res.currentPage, totalElements:res.totalElements} as Pagination
                    setPagination(pagination);
                } else {
                    setError(new Error());
                }
            } catch (error) {
                setError(new Error());
            }

        };
        fetchData();
    }, [error, nextPage, size]);


    if (!error) {
        return (
            <>
                <table className="table mt-3">
                    <thead className="table-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Ім`я</th>

                        <th scope="col">Зображення</th>
                        <th scope="col">#</th>
                    </tr>
                    </thead>
                    <tbody>
                    {!!dictionaryPages && dictionaryPages.length > 0 && dictionaryPages.map((dictionaryPage) => (
                        <tr key={dictionaryPage.uuid}>
                            <th scope="row">{dictionaryPage.id}</th>
                            <td>{dictionaryPage.name}</td>
                            <td>
                                {dictionaryPage.image.imageName &&
                                    <Image src={'/api/dictionary-page/' + dictionaryPage.image.imageName} alt=""
                                           width={60} height={60}/>
                                }
                            </td>
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
                {pagination && <PaginationComponent pagination={pagination} nextPage={setNextPage} size={setSize}/>}
            </>
        );
    }
    return (
        <>
            <DeleteJwtAccessToken/>
            <NoContent/>
        </>
    );
};