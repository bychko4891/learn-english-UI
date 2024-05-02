'use client'

import React, {useEffect, useState} from "react";
import "./search.style.css";
import {getWordsForUserSearchAPI} from "@/app/dictionary/searchWordsForUser";
import {DictionaryPage} from "@/app/DefaultResponsesInterfaces";
import Link from "next/link";

export const SearchWords = () => {

    const [search, setSearch] = useState<string>("");
    const [suggestions, setSuggestions] = useState<DictionaryPage[]>();


    useEffect(() => {
        if (search && search.length > 0) {
            const searchWords = async () => {
                const words = await getWordsForUserSearchAPI(search);
                if (words) {
                    setSuggestions(words);
                }
            }
            searchWords();
        }
        setSuggestions([]);
    }, [search]);

    const handleClick = (e: MouseEvent) => {
        if (e.target && !(e.target as HTMLElement).closest('input')) {
            setSuggestions([]);
            setSearch("");
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <div className="search__container col-12 me-auto">
            <input className="search__input" type="search" placeholder="Пошук слова..." value={search}
                   onChange={(event) => setSearch(event.target.value)}/>
            {suggestions && suggestions.length > 0 ? (
                <div className="search_result_style">
                    {suggestions.map(dictionaryPage => (
                        <Link key={dictionaryPage.uuid} href={'/dictionary/word/' + dictionaryPage.name}>
                            <div className="result-block align-items-center">
                                <h5>{dictionaryPage.name}</h5>
                                {dictionaryPage.word.translate && <p>- {dictionaryPage.word.translate}</p>}
                            </div>
                        </Link>
                    ))}

                </div>

            ) : (
                <>
                    {search && search?.length > 0 &&
                        <div className="search_result_style">
                            <p>За Вашим запитом нічого не знайдено</p>
                        </div>
                    }
                </>
            )}
        </div>
    );
};

