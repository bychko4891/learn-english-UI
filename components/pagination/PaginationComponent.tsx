'use client'

import {Pagination} from "@/app/DefaultResponsesInterfaces";
import Link from "next/link";
import {MouseEvent, useState} from 'react';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {ReactSVG} from "react-svg";
import "./pagination.style.css";


export const PaginationComponent = ( props:{pagination: Pagination} ) => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const [sizeSelect, setSizeSelect] = useState("10");
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);


    const pages: number[] = [];

    for (let i = 1; i <= props.pagination.totalPages; i++) {
        pages.push(i);
    }


    const handlePageClick = (event: MouseEvent<HTMLAnchorElement>, page: number) => {
        event.preventDefault();
        const params = new URLSearchParams(searchParams);
        if (page) {
            params.set('page', (page).toString());
            params.set('size', sizeSelect);
        } else {
            params.delete('page');
            params.delete('size');
        }
        replace(`${pathname}?${params.toString()}`);
    };

    const handleButtonNextClick = () => {
        if (currentPage < (props.pagination.totalPages - 1)) {
            const params = new URLSearchParams(searchParams);
            params.set('page', (currentPage + 2).toString());
            params.set('size', sizeSelect);
            replace(`${pathname}?${params.toString()}`);
        }
    };
    const handleButtonPrevClick = () => {
        if (currentPage > 0) {
            const params = new URLSearchParams(searchParams);
            params.set('page', (currentPage).toString());
            params.set('size', sizeSelect);
            replace(`${pathname}?${params.toString()}`);
        }
    };

    const handleSelectSize = (selectSize: string) => {
        setSizeSelect(selectSize);
        setCurrentPage(1);
        const params = new URLSearchParams(searchParams);
        params.set('page', "1");
        params.set('size', selectSize);
        replace(`${pathname}?${params.toString()}`);
    };

    if (props.pagination.totalPages < 6) {
        return (
            <>
                <div className="mx-auto d-inline-flex gap-2">
                    <button className={currentPage === 1 ? 'btn-p' : 'btn-p__interactive'} onClick={handleButtonPrevClick} disabled={currentPage === 1}>
                        <ReactSVG beforeInjection={(svg) => {
                            svg.setAttribute('style', 'height: 25px; width: 25px;')
                        }} src="/images/arrow-prev.svg" className="btn-p__svg reset-styles"/>
                    </button>
                    <select onChange={(e) => handleSelectSize(e.target.value)} className="size__pagination">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="75">75</option>
                        <option value="100">100</option>
                    </select>
                    <ul className="d-inline-flex p-0 m-0">
                        {pages.map((page, index) => (
                            <li key={index} className="btn-p__page-li">
                                <>
                                    {page === currentPage + 1 ? (
                                        <div className="btn-p__page-current">
                                            <span>{page}</span>
                                        </div>
                                    ) : (
                                        <Link href={'/admin/dictionary-pages?page=' + page + `&size=${sizeSelect}`}
                                              onClick={(event) => handlePageClick(event, page)}>
                                            <div className="btn-p__page btn-p__interactive">
                                                <span>{page}</span>
                                            </div>
                                        </Link>
                                    )}
                                </>
                            </li>
                        ))}
                    </ul>
                    <button type="button" onClick={handleButtonNextClick}
                            disabled={currentPage === props.pagination.totalPages - 1}
                            className={currentPage === props.pagination.totalPages - 1 ? 'btn-p' : 'btn-p btn-p__interactive'}>
                        <ReactSVG beforeInjection={(svg) => {
                            svg.setAttribute('style', 'height: 25px; width: 25px;')
                        }} src="/images/arrow-next.svg" className="btn-p__svg reset-styles"/>
                    </button>
                </div>
            </>
        );
    }
};