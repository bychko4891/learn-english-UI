'use client'

import {useEffect, useState} from "react";
import {getWordsBySearchAPI} from "@/app/(protected)/admin/dictionary-pages/dictionary-page/[uuid]/getWordsBySearchAPI";
import {Word} from "@/app/DefaultResponsesInterfaces";

type Props = {
    onSearch: (value: Word[]) => void;
}
export const SearchWord = ({onSearch}: Props) => {

    const [search, setSearch] = useState("");

    useEffect(() => {
        if (search.length > 0) {
            const searchWords = async () => {
                const words = await getWordsBySearchAPI(search);
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