'use client'

import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import {Article} from "@/app/DefaultResponsesInterfaces";
import {DeleteJwtAccessToken} from "@/app/(protected)/jwtSessionService/DeleteJwtAccessToken";
import {getArticlesAPI} from "@/app/(protected)/admin/articles/getArticlesAPI";

export const Articles = () => {

    const [articles, setArticles] = useState<Article[]>();
    const [error, setError] = useState<Error>();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getArticlesAPI();
                if (res) {
                    setArticles(res);
                }
                if (!res) setError(new Error);
            } catch (error) {
                setError(new Error);
            }
        };
        fetchData();
    }, []);

    if (!error) {
        return (
            <table className="table mt-3">
                <thead className="table-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">h1</th>

                    <th scope="col">категорія</th>
                    <th scope="col">#</th>
                </tr>
                </thead>
                <tbody>
                {articles && articles.length > 0 && articles.map((article) => (
                    <tr key={article.uuid}>
                        <th scope="row">{article.id}</th>
                        <td>{article.h1}</td>
                        <td>{article.category && article.category.name || "Відсутня"}</td>
                        <td>
                            <Link href={'/admin/articles/article/' + article.uuid}>
                                <div className="br-g edit-link">
                                    <Image unoptimized src="/images/edit.svg" width="25" height="25" alt="" className="edit-svg"/>
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
            <DeleteJwtAccessToken/>
        </>
    );
};