'use client'

import React, { useEffect, useState } from "react";
import {
    searchWord,
    SimpleWord
} from "@/app/(protected)/admin/dictionary-pages/dictionary-page/[uuid]/searchWord";


export function SearchWord(props: {
    searchTo: string;
    wordName: string;
    wordUUID: string;
    setWordName: (wordName: string) => void;
    setWordUUID: (wordUUID: string) => void }) {

    const [words, setWords] = useState<SimpleWord[]>([]);
    const [openWordList, setOpenWordList] = useState<boolean>(false);

    useEffect(() => {
        if (props.wordName.length > 0) {
            (async () => {
                const res = await searchWord(props.wordName, props.searchTo);
                if(res.ok) {
                   setWords(res.ok);
                }
            })()
        }
        setWords([]);
    }, [props.wordName]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>,uuid: string, wordName: string) => {
        e.preventDefault();
        props.setWordUUID(uuid);
        props.setWordName(wordName);
        setOpenWordList(false);
    }


    return (
        <div className="position-relative">
            <input className="w-100" type="search" placeholder="пошук слова..."
                   onFocus={() => setOpenWordList(true)}
                   value={props.wordName}
                   onChange={(event) => {
                       props.setWordName(event.target.value);
                   }}
                   required
            />
            {openWordList && words && words.length > 0 &&
                <div className="col-md-2 search__result flex-column position-absolute">
                    {words.map(word => (
                        <div key={word.uuid}>
                            <div className="d-flex flex-row gap-4">
                                <span>{word.name}</span>
                                <button type="button" onClick={(e) => {
                                    handleClick(e, word.uuid, word.name);
                                }}> + </button>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}