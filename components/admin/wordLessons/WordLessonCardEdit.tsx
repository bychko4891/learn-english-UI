'use client'

import {DictionaryPage, WordLessonCard} from "@/app/DefaultResponsesInterfaces";
import React, {ReactNode, useEffect, useState} from "react";
import {SearchDictionaryPage} from "@/components/admin/wordLessons/SearchDictionaryPage";
import {DictionaryPageSearchResult} from "@/components/admin/wordLessons/DictionaryPageSearchResult";

type Props = {
    card: WordLessonCard;
    children: ReactNode;
    updateCard: (updatedCard: WordLessonCard) => void;
}

export const WordLessonCardEdit = ({card, children, updateCard}: Props) => {

    const [sortOrder, setSortOrder] = useState(card.sortOrder);
    const [description, setDescription] = useState(card.description);
    const [dictionaryPages, setDictionaryPages] = useState<DictionaryPage[]>();
    const [dictionaryPage, setDictionaryPage] = useState<DictionaryPage>();
    const [requiredFieldError, setRequiredFieldError] = useState("")

    useEffect(() => {
        if (dictionaryPage) {
            setDictionaryPages([]);
            setRequiredFieldError("");
        }
    }, [dictionaryPage]);

    const handleSave = () => {
        if (dictionaryPage) {
            setRequiredFieldError("");
            const cardUpdated = {
                uuid: card.uuid,
                description: description,
                sortOrder: sortOrder,
                dictionaryPage: dictionaryPage
            } as WordLessonCard;
            updateCard(cardUpdated);
        } else {
            setRequiredFieldError("Обов'язкове поле не може бути пустим!");
        }
    };

    const handleClickDictionaryPageDelete = () => {
        setDictionaryPage(card.dictionaryPage);
    }

    return (
        <div className="d-flex flex-column">
            <div className="row col-12 me-auto">
                <div className="col-md-2 col-12">
                    <label htmlFor="description">Опис картки: </label>
                </div>
                <div className="col-md-10 col-12">
                    <textarea cols={2} id="description" className="h-auto w-95" value={description}
                              onChange={(e) => setDescription(e.target.value)}/>
                </div>

            </div>
            <div className="row col-12">
                <div className="d-flex col-md-3 col-12 me-auto">
                    <label htmlFor="sort">Порядок сортування: </label>
                    <input id="sort" type="number" value={sortOrder} onChange={(e) => setSortOrder(+e.target.value)}
                           style={{width: 60}}/>
                </div>
                <div className="d-flex col-md-9 col-12">
                    <SearchDictionaryPage onSearch={setDictionaryPages}/>
                    {dictionaryPages && dictionaryPages.length > 0 &&
                        <div className="col-md-2 search__result flex-column" style={{marginTop: 35}}>
                            {dictionaryPages.map(dictionaryPage => (
                                <div key={dictionaryPage.uuid}>
                                    <DictionaryPageSearchResult dictionaryPage={dictionaryPage}
                                                                dictionaryPageChange={setDictionaryPage}/>
                                </div>
                            ))}
                        </div>}
                    <div className="d-flex ms-3">
                        <span>Слово картки: </span>
                        <div className="needs"></div>
                        {dictionaryPage &&
                            <>
                                <span className="ms-3">{dictionaryPage.name}</span>
                                <button type="button" onClick={handleClickDictionaryPageDelete}
                                        className="delete__b ms-1">X
                                </button>
                            </>
                        }
                        {requiredFieldError && <span className="ms-3 p_error">{requiredFieldError}</span>}
                    </div>
                </div>

            </div>
            <div>
                <button type="button" onClick={handleSave}>Save</button>
                {children}
            </div>

        </div>
    );
};