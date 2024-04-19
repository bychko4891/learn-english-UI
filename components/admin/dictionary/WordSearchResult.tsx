import {Word} from "@/app/DefaultResponsesInterfaces";

type Props = {
    word: Word;
    wordChange: (value: Word) => void;
}

export const WordSearchResult = ({ word, wordChange }: Props) => {
    const handleClick = () => {
        wordChange(word);
    }

    return (
        <div className="d-flex flex-row gap-4">

            <span>{word.name}</span>
            <button type="button" onClick={handleClick}> + </button>
        </div>
    );
};