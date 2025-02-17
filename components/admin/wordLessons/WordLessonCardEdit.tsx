'use client'

import React from "react";
import {WordCardState} from "@/components/admin/wordLessons/WordLessonForm";
import {SearchWord} from "@/components/admin/dictionary/SearchWord";


export function WordLessonCardEdit(props:{
    card: WordCardState;
    setCard: (updatedCard: WordCardState | null) => void;
}) {


    return (
        <div className="d-flex flex-column gap-1">
            <div className="row col-12 me-auto">
                <div className="d-flex col-md-2 col-12 ps-4">
                    <label htmlFor="description">Опис картки*: </label>
                </div>
                <div className="d-flex col-md-10 col-12 me-auto">
                    <textarea id="description" className="h-auto w-95"
                              value={props.card.description}
                              onChange={(e) => {
                                  props.setCard({...props.card, description: e.target.value});
                              }}
                              cols={2}
                    />
                </div>
            </div>
            <div className="row col-12 me-auto">
                <div className="d-flex col-md-2 col-12 ps-4">
                    <label htmlFor="description">Слово картки*: </label>
                </div>
                <div className="d-flex col-md-9 col-12 me-auto">
                    <SearchWord
                        searchTo={"lesson"}
                        wordName={props.card.wordName}
                        wordUUID={props.card.wordUUID}
                        setWordUUID={(uuid) => {
                            const tempState = props.card;
                            tempState.wordUUID = uuid;
                            props.setCard(tempState);
                        }}
                        setWordName={(name) => {
                            props.setCard({...props.card, wordName: name})
                        }}
                    />
                </div>
            </div>
            <div className="row col-12 position-relative">
                <div className="d-flex col-md-2 col-12 ps-4">
                    <label htmlFor="sort">Сортування: </label>
                </div>
                <div className="d-flex col-md-9 col-12 me-auto">
                    <input id="sort" type="number"
                           value={props.card.sortOrder}
                           onChange={(e) => {
                               props.setCard({...props.card, sortOrder: +e.target.value});
                           }}
                           min={0}
                           max={10000}
                    />
                </div>
                <div className="d-flex col-md-1 col-12 position-absolute bottom-0 end-0">
                    <button type="button" className="b-curt-delete ms-auto"
                        onClick={() => props.setCard(null)}
                    >
                        X
                    </button>
                </div>
            </div>
        </div>
    );
};