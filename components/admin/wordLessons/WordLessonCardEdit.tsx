'use client'

import React, {useEffect, useState} from "react";
import {SearchDictionaryPage} from "@/components/admin/wordLessons/SearchDictionaryPage";
import {DictionaryPageSearchResult} from "@/components/admin/wordLessons/DictionaryPageSearchResult";
import {WordCard} from "@/components/admin/wordLessons/WordLessonEdit";
import {Word} from "@/app/DefaultResponsesInterfaces";

type Props = {
    card: WordCard;
    updateCard: (updatedCard: WordCard | undefined) => void;
}

export const WordLessonCardEdit = ({card, updateCard}: Props) => {

    const [words, setWords] = useState<Word[]>();
    const [cardSave, setCardSave] = useState(card);
    const [requiredFieldError, setRequiredFieldError] = useState("")

    useEffect(() => {
        if (card) {
            setWords([]);
            setRequiredFieldError("");
        }
    }, [card]);

    const handleSave = () => {
        if (card && cardSave) {
            setRequiredFieldError("");
            updateCard(cardSave);
        } else {
            setRequiredFieldError("Обов'язкове поле не може бути пустим!");
        }
    };

    const handleClickWordSelectedDelete = () => {
        setCardSave({...cardSave, wordUUID: "", wordName: ""});
        setRequiredFieldError("Обов'язкове поле не може бути пустим!");
    }

    return (
        <div className="d-flex flex-column">
            <div className="row col-12 me-auto">
                <div className="col-md-2 col-12">
                    <label htmlFor="description">Опис картки: </label>
                </div>
                <div className="col-md-10 col-12">
                    <textarea  id="description" className="h-auto w-95"
                               value={cardSave.description}
                               onChange={(e) => {
                                   setCardSave({...cardSave, description: e.target.value});
                               }}
                               cols={2}
                    />
                </div>

            </div>
            <div className="row col-12">
                <div className="d-flex col-md-3 col-12 me-auto">
                    <label htmlFor="sort">Порядок сортування: </label>
                    <input id="sort" type="number"  style={{width: 60}}
                           value={cardSave.sortOrder}
                           onChange={(e) => {
                               setCardSave({...cardSave, sortOrder: + e.target.value});
                           }}
                    />
                </div>
                <div className="d-flex col-md-9 col-12">
                    <SearchDictionaryPage onSearch={setWords}/>
                    {words && words.length > 0 &&
                        <div className="col-md-2 search__result flex-column" style={{marginTop: 35}}>
                            {words.map(word => (
                                <div key={word.uuid}>
                                    <DictionaryPageSearchResult
                                        word={word}
                                        setSelectWord={(word) => {
                                            setCardSave({...cardSave, wordUUID: word.uuid, wordName: word.name});
                                            setWords([]);
                                            setRequiredFieldError("");
                                        }}
                                    />
                                </div>
                            ))}
                        </div>}
                    <div className="d-flex ms-3">
                        <span>Слово картки: </span>
                        <div className="needs"></div>
                        {card &&
                            <>
                                <span className="ms-3" style={{color: "#298ff8"}}>{cardSave.wordName}</span>
                                <button type="button" className="delete__b ms-1"
                                        onClick={handleClickWordSelectedDelete}
                                >
                                    X
                                </button>
                            </>
                        }
                        {requiredFieldError && <span className="ms-3 p_error">{requiredFieldError}</span>}
                    </div>
                </div>

            </div>
            <div>
                <button type="button" onClick={handleSave} className="b-curt-save">Save</button>
                <button type="button" className="b-curt-delete"
                        onClick={() => updateCard(undefined)}
                >
                    X
                </button>
            </div>

        </div>
    );
};