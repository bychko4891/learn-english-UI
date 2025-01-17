'use client'

import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import {Pagination, Word} from "@/app/DefaultResponsesInterfaces";
import {DeleteJwtAccessToken} from "@/app/(protected)/jwtSessionService/DeleteJwtAccessToken";
import {NoContent} from "@/components/noContent/NoContent";
import {getWordsAPI} from "@/app/(protected)/admin/words/getWordsAPI";
import {PaginationComponent} from "@/components/pagination/PaginationComponent";

export const Words = () => {

    const [words, setWords] = useState<Word[]>();
    const [nextPage, setNextPage] = useState<number>(0);
    const [size, setSize] = useState<number>(25);
    const [error, setError] = useState<Error>();
    const [pagination, setPagination] = useState<Pagination>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getWordsAPI(nextPage, size);
                if (res) {
                    setWords(res.t);
                    const pagination = {
                        totalPages: res.totalPages,
                        currentPage: res.currentPage,
                        totalElements: res.totalElements
                    } as Pagination
                    setPagination(pagination);
                } else setError(new Error());
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

                        <th scope="col">Переклад</th>
                        <th scope="col">#</th>
                    </tr>
                    </thead>
                    <tbody>
                    {!!words && words.length > 0 && words.map((word) => (
                        <tr key={word.uuid}>
                            <th scope="row">{word.id}</th>
                            <td>{word.name}</td>
                            <td>{word.translate}</td>
                            <td>
                                <Link href={'/admin/words/word/' + word.uuid}>
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
            <NoContent/>
            <DeleteJwtAccessToken/>
        </>
    );
};