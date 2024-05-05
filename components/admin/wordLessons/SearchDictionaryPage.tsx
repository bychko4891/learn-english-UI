'use client'

import {useEffect, useState} from "react";
import {getWordsBySearchAPI} from "@/app/(protected)/admin/dictionary-pages/dictionary-page/[uuid]/getWordsBySearchAPI";
import {DictionaryPage, Word} from "@/app/DefaultResponsesInterfaces";
import {
    getDictionaryPagesBySearchAPI
} from "@/app/(protected)/admin/word-lessons/word-lesson/[uuid]/getDictionaryPagesBySearchAPI";

type Props = {
    onSearch: (value: DictionaryPage[]) => void;
}
export const SearchDictionaryPage = ({onSearch}: Props) => {

    const [search, setSearch] = useState("");

    useEffect(() => {
        if (search.length > 0) {
            const searchWords = async () => {
                const dictionaryPages = await getDictionaryPagesBySearchAPI(search);
                onSearch(dictionaryPages || []);
            }
            searchWords();
        }
        onSearch([]);
    }, [search]);

    // const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    //     event.preventDefault();
    //     const words = await getWordsBySearchAPI(search);
    //     onSearch(words || [])
    // }


    return (
        // <form onSubmit={handleSubmit}>
        <input type="search" placeholder="пошук слова..." value={search} onChange={(event) => setSearch(event.target.value)}/>
        // <button type="submit">Search</button>
        // </form>
    );
};