'use client'

import Link from "next/link";
import {ReactElement, ReactNode, useState} from "react";
import {ReactSVG} from "react-svg";

export const CategoryCategories = ({
                                       categoryName, categoryUuid,
                                       categories
                                   }: {
    categoryName: string,
    categoryUuid: string,
    categories: ReactNode
}) => {


    const [isCategoryActive, setIsCategoryActive] = useState(false);

    async function handleClick() {
        setIsCategoryActive(!isCategoryActive);
    }

    const categoryClasses = isCategoryActive ? 'category visible' : 'category';

    return (
        <>
            <div className="d-flex">
                <span>{categoryName}</span>
                <button type="button" className="toggle" onClick={handleClick}>
                    <ReactSVG src="/images/arrow-bottom.svg" className="color-arrow-svg"/>
                </button>
                <Link href={'/admin/categories/category/' + categoryUuid} className="edit">
                    <ReactSVG src="/images/edit.svg" className="color-edit-svg"/>
                </Link>
            </div>
            <ul key={categoryUuid} className={categoryClasses}>
                {categories}
            </ul>
        </>
    );
};