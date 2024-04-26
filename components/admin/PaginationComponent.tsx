'use client'

import {Pagination} from "@/app/DefaultResponsesInterfaces";
import Link from "next/link";
import {MouseEvent, useState} from 'react';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {ReactSVG} from "react-svg";

type Props = {
    nextPage: (value: number) => void;
    size: (value:number) => void;
    pagination: Pagination;
}

export const PaginationComponent = ({pagination, nextPage, size}: Props) => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const [sizeSelect, setSizeSelect] = useState("25");

    const pages: number[] = [];

    for (let i = 1; i <= pagination.totalPages; i++) {
        pages.push(i);
    }



    const handlePageClick = (event: MouseEvent<HTMLAnchorElement>, page: number) => {
        event.preventDefault();
        nextPage(page - 1);
        size( + sizeSelect);
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
        if (pagination.currentPage < (pagination.totalPages - 1)) {
            nextPage(pagination.currentPage + 1);
            size(+ sizeSelect);
            const params = new URLSearchParams(searchParams);
                params.set('page', (pagination.currentPage + 2).toString());
                params.set('size', sizeSelect);
            replace(`${pathname}?${params.toString()}`);
        }
    };
    const handleButtonPrevClick = () => {
        if (pagination.currentPage > 0) {
            nextPage(pagination.currentPage - 1);
            size(+ sizeSelect);
            const params = new URLSearchParams(searchParams);
                params.set('page', (pagination.currentPage).toString());
                params.set('size', sizeSelect);
            replace(`${pathname}?${params.toString()}`);
        }
    };

    const handleSelectSize = (selectSize: string) => {
        setSizeSelect(selectSize);
        size(+ selectSize);
        const params = new URLSearchParams(searchParams);
        params.set('page', (pagination.currentPage + 1).toString());
        params.set('size', selectSize);
        replace(`${pathname}?${params.toString()}`);
    };

console.log(sizeSelect)
    if (pagination.totalPages < 6) {
        return (
            <>
                <div className="mx-auto d-inline-flex gap-2" style={{}}>
                    <button type="button" onClick={handleButtonPrevClick} disabled={pagination.currentPage === 0}>
                        <ReactSVG beforeInjection={(svg) => {
                        svg.setAttribute('style', 'height: 25px; width: 25px;')
                    }} src="/images/arrow-prev.svg"  className="colored-svg reset-styles" />
                    </button>
                    <select onChange={(e) => handleSelectSize(e.target.value)}>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="75">75</option>
                        <option value="100">100</option>
                    </select>
                    <ul className="d-inline-flex" style={{padding: 0, margin: 0}}>
                        {pages.map(page => (
                            <li key={page} style={{position: "relative", top: 6}}>
                                <Link href={'/admin/dictionary-pages?page=' + page + `&size=${sizeSelect}`}
                                      onClick={(event) => handlePageClick(event, page)}>
                                    <span style={{border: "1px solid", padding: "9px 10px", margin: 5}}>{page}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <button type="button" onClick={handleButtonNextClick}><
                        ReactSVG beforeInjection={(svg) => {
                        svg.setAttribute('style', 'height: 25px; width: 25px;')
                    }} src="/images/arrow-next.svg"  className="colored-svg reset-styles" />
                    </button>
                </div>
            </>
        );
    }
};