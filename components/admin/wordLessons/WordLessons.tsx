'use client'

import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import {Pagination} from "@/app/DefaultResponsesInterfaces";
import {DeleteJwtAccessToken} from "@/app/(protected)/jwtSessionService/DeleteJwtAccessToken";
import {NoContent} from "@/components/noContent/NoContent";
import {PaginationComponent} from "@/components/pagination/PaginationComponent";
import {getWordLessons, SimpleLesson } from "@/app/(protected)/admin/word-lessons/getWordLessons";
import {useSearchParams} from "next/navigation";

export const WordLessons = () => {


    const searchParams = useSearchParams();
    const [wordLessons, setWordLessons] = useState<SimpleLesson[]>();
    const [error, setError] = useState<Error>();
    const [pagination, setPagination] = useState<Pagination>();

    console.log(searchParams.get("size")?.toString() + " <-- size");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getWordLessons({
                    searchQuery: searchParams.get("searchQuery")?.toString(),
                    sort: searchParams.get("sort")?.toString(),
                    page: searchParams.get("page")?.toString(),
                    size: searchParams.get("size")?.toString(),
                });
                if (res.ok) {
                    setWordLessons(res.ok.t);
                    const pagination = {
                        totalPages: res.ok.totalPages,
                        // currentPage: res.currentPage,
                        // totalElements: res.totalElements
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
                        <th scope="col">Порядок сортування</th>
                        <th scope="col">Категорія</th>
                        <th scope="col">#</th>
                    </tr>
                    </thead>
                    <tbody>
                    {!!wordLessons && wordLessons.length > 0 && wordLessons.map((wordLesson) => (
                        <tr key={wordLesson.uuid}>
                            <td>{wordLesson.name}</td>
                            <td>{wordLesson.sortOrder}</td>
                            <td>{wordLesson.categoryName}</td>
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