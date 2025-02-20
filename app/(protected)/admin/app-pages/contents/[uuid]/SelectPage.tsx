'use client'

import React, { useEffect, useState } from "react";
import {
    searchWord,
    SimpleWord
} from "@/app/(protected)/admin/dictionary-pages/dictionary-page/[uuid]/searchWord";
import {getAppPages, SimpleAppPage} from "@/app/(protected)/admin/app-pages/getAppPages";


export function SelectPage(props: {
    pageUrl: string;
    pageUUID: string;
    setPageUrl: (url: string) => void;
    setPageUUID: (pageUUID: string) => void }) {

    const [pages, setPages] = useState<SimpleAppPage[]>([]);
    const [openWordList, setOpenWordList] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const res = await getAppPages();
            if(res.ok?.t) {
                setPages(res.ok.t);
            }
        })()
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>,uuid: string, url: string) => {
        e.preventDefault();
        props.setPageUUID(uuid);
        props.setPageUrl(url);
        setOpenWordList(false);
    }


    return (
        <div className="position-relative w-100">
            <label className="d-flex align-items-start">Сторінка виводу*: </label>
            <input className="w-100"
                // type="search"
                   placeholder="сторінка виводу..."
                   onFocus={() => setOpenWordList(true)}
                   value={props.pageUrl}
                   onChange={(event) => {
                       props.setPageUrl(event.target.value);
                   }}
                   required
            />
            {openWordList && pages && pages.length > 0 &&
                <div className="col-md-2 search__result flex-column position-absolute">
                    {pages.map(page => (
                        <div key={page.uuid}>
                            <div className="d-flex flex-row gap-4">
                                <span>{page.url}</span>
                                <button type="button" onClick={(e) => {
                                    handleClick(e, page.uuid, page.url);
                                }}> +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}