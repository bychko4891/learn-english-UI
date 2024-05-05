'use client'

import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import {Pagination, WordLesson} from "@/app/DefaultResponsesInterfaces";
import {DeleteJwtAccessToken} from "@/app/(protected)/jwtSessionService/DeleteJwtAccessToken";
import {NoContent} from "@/components/noContent/NoContent";
import {PaginationComponent} from "@/components/pagination/PaginationComponent";
import {getWordLessonsAPI} from "@/app/(protected)/admin/word-lessons/getWordLessonsAPI";

export const WordLessons = () => {

    const [wordLessons, setWordLessons] = useState<WordLesson[]>();
    const [nextPage, setNextPage] = useState<number>(0);
    const [size, setSize] = useState<number>(25);
    const [error, setError] = useState<Error>();
    const [pagination, setPagination] = useState<Pagination>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getWordLessonsAPI(nextPage, size);
                if (res) {
                    setWordLessons(res.t);
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
                        <th scope="col">Порядок сортування</th>
                        <th scope="col">Ім`я</th>

                        <th scope="col">Опис</th>
                        <th scope="col">Категорія</th>
                        <th scope="col">#</th>
                    </tr>
                    </thead>
                    <tbody>
                    {!!wordLessons && wordLessons.length > 0 && wordLessons.map((wordLesson) => (
                        <tr key={wordLesson.uuid}>
                            <th scope="row">{wordLesson.id}</th>
                            <td>{wordLesson.sortOrder}</td>
                            <td>{wordLesson.name}</td>
                            <td>{wordLesson.description}</td>
                            <td>{wordLesson.category ? wordLesson.category.name : "Відсутня"}</td>
                            <td>{wordLesson.category ? wordLesson.category.name : "Відсутня"}</td>
                            <td>
                                <Link href={'/admin/word-lessons/word-lesson/' + wordLesson.uuid}>
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