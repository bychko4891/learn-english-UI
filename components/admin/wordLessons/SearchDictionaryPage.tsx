'use client'

import {useEffect, useState} from "react";
import {getWordsBySearchAPI} from "@/app/(protected)/admin/dictionary-pages/dictionary-page/[uuid]/getWordsBySearchAPI";
import {DictionaryPage, Word} from "@/app/DefaultResponsesInterfaces";
import {
    fetchSearchWordToCardAPI
} from "@/app/(protected)/admin/word-lessons/word-lesson/[uuid]/fetchSearchWordToCardAPI";

type Props = {
    onSearch: (value: Word[]) => void;
}
export const SearchDictionaryPage = ({onSearch}: Props) => {

    const [search, setSearch] = useState("");

    useEffect(() => {
        if (search.length > 0) {
            const searchWords = async () => {
                const words = await fetchSearchWordToCardAPI(search);
                onSearch(words || []);
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