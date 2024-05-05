import {DictionaryPage, Word} from "@/app/DefaultResponsesInterfaces";

type Props = {
    dictionaryPage: DictionaryPage;
    dictionaryPageChange: (value: DictionaryPage) => void;
}

export const DictionaryPageSearchResult = ({ dictionaryPage, dictionaryPageChange }: Props) => {
    const handleClick = () => {
        dictionaryPageChange(dictionaryPage);
    }

    return (
        <div className="d-flex flex-row gap-4">

            <span>{dictionaryPage.name}</span>
            <button type="button" onClick={handleClick}> + </button>
        </div>
    );
};