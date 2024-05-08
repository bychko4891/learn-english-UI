'use client'

import Link from "next/link";
import {ReactNode, useState} from "react";
import {ReactSVG} from "react-svg";

export const CategoryAndSubcategories = ({categoryName, sortOrder, categoryUuid, categories}: {categoryName: string, sortOrder: number, categoryUuid: string, categories: ReactNode}) => {


    const [isCategoryActive, setIsCategoryActive] = useState(false);

    async function handleClick() {
        setIsCategoryActive(!isCategoryActive);
    }

    const categoryClasses = isCategoryActive ? 'category visible' : 'category';

    return (
        <>
            <div className="d-flex">
                <span className="span-color__highlight">{categoryName}</span>
                <span> - sort order: </span>
                <span className="span-color__highlight">{sortOrder}</span>
                <button type="button" className="toggle" onClick={handleClick}>
                    <ReactSVG src="/images/arrow-bottom.svg" className="color-arrow-svg" beforeInjection={(svg) => {
                        svg.setAttribute('style', 'width: 35px')
                        svg.setAttribute('style', 'height: 35px')
                    }}/>
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