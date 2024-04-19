'use client'

import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import {DictionaryPage, Word} from "@/app/DefaultResponsesInterfaces";
import {DeleteJwtAccessToken} from "@/app/(protected)/jwtSessionService/DeleteJwtAccessToken";
import {NoContent} from "@/components/noContent/NoContent";
import {getWordsAPI} from "@/app/(protected)/admin/words/getWordsAPI";
import {getDictionaryPagesAPI} from "@/app/(protected)/admin/dictionary-pages/getDictionaryPagesAPI";

export const DictionaryPages = () => {

    const [words, setWords] = useState<DictionaryPage[]>();
    const [totalPages, setTotalPages] = useState<number>();
    const [currentPage, setCurrentPage] = useState<number>();
    const [totalElements, setTotalElements] = useState<number>();
    const [error, setError] = useState<Error>();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getDictionaryPagesAPI();
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
                        <td></td>
                        {/*<td>{word.translate}</td>*/}
                        <td>
                            <Link href={'/admin/dictionary-pages/dictionary-page/' + word.uuid}>
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