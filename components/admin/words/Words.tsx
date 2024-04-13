'use client'

import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import {Word} from "@/app/DefaultResponsesInterfaces";
import {DeleteJwtAccessToken} from "@/app/(protected)/jwtSessionService/DeleteJwtAccessToken";
import {NoContent} from "@/components/noContent/NoContent";
import {getWordsAPI} from "@/app/(protected)/admin/words/getWordsAPI";

export const Words = () => {

    const [words, setWords] = useState<Word[]>();
    const [totalPages, setTotalPages] = useState<number>();
    const [currentPage, setCurrentPage] = useState<number>();
    const [totalElements, setTotalElements] = useState<number>();
    const [error, setError] = useState<Error>();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getWordsAPI();
                if (res) {
                    setWords(res.t);
                    setTotalPages(res.totalPages);
                    setCurrentPage(res.currentPage);
                    setTotalElements(res.totalElements);
                }
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
        );
    }
    return (
        <>
            <NoContent/>
            <DeleteJwtAccessToken/>
        </>
    );
};