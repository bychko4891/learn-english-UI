import { Word } from "@/app/DefaultResponsesInterfaces";

type Props = {
    word: Word;
    setSelectWord: (value: Word) => void;
}

export const DictionaryPageSearchResult = ({ word, setSelectWord }: Props) => {
    const handleClick = () => {
        setSelectWord(word);
    }

    return (
        <div className="d-flex flex-row gap-4">

            <span>{word.name}</span>
            <button type="button" onClick={handleClick}> + </button>
        </div>
    );
};