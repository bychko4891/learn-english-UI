'use client'

import React, {FormEvent, useState} from "react";
import { SEOObject } from "@/app/DefaultResponsesInterfaces";
import {toast, ToastContainer, Zoom} from "react-toastify";
import {ButtonBack} from "@/components/admin/ButtonBack";
import {ReactSVG} from "react-svg";
import "./word-lesson.style.css"
import {WordLessonCardEdit} from "@/components/admin/wordLessons/WordLessonCardEdit";
import {v4 as uuidv4} from 'uuid';
import {saveWordLessonAPI} from "@/app/(protected)/admin/word-lessons/word-lesson/[uuid]/saveWordLessonAPI";
import {
    LessonWords, LessonWordsAnkiType,
    LessonWordsByLevel
} from "@/app/(protected)/admin/word-lessons/word-lesson/[uuid]/getWordLessonAPI";
import {SearchCategory} from "@/app/(protected)/admin/categories/category/[uuid]/SearchCategory";
import 'react-toastify/dist/ReactToastify.css';
import {ShowErrorMessage} from "@/components/ShowErrorMessage";

export type WordCardState = {
    id: number;
    uuid: string
    description: string;
    wordUUID: string;
    wordName: string;
    sortOrder: number;
}

export type LessonWordState = {
    uuid: string;
    name: string;
    description: string;
    sortOrder: number;
    categoryUUID: string;
    categoryName: string;
    seoObject: SEOObject;
} & (
    | {
    lessonType: "byLevel";
    cards: WordCardState[] | [];
}
    | {
    lessonType: "ankiType";
    lessonsByLevel: { lessonName: string, lessonUUID: string } [] | [];
    }
    | {
    lessonType: string;
}
    );

export function WordLessonForm(props:{ lessonResp: LessonWords })  {

    const [lessonSaved, setLessonSaved] = useState<LessonWords>(props.lessonResp);

    const [lessonState, setLessonState] = useState<LessonWordState>({
        uuid: lessonSaved.uuid,
        name: lessonSaved.name,
        description: lessonSaved.description,
        sortOrder: lessonSaved.sortOrder,
        categoryUUID: lessonSaved.categoryUUID,
        categoryName: "",
        seoObject: {
            h1: lessonSaved.seoObject?.h1 ?? "",
            htmlTagTitle: lessonSaved.seoObject?.htmlTagTitle ?? "",
            htmlTagDescription: lessonSaved.seoObject?.htmlTagDescription ?? "",
        } as SEOObject,
        ...(lessonSaved.lessonType === "byLevel" ? {
            lessonType: "byLevel",
            cards: (lessonSaved as LessonWordsByLevel).cards.map((c) => {
                return {
                    uuid: c.uuid,
                    description: c.description,
                    wordUUID: c.word.uuid,
                    wordName: c.word.name,
                    sortOrder: c.sortOrder,
                }
            }) as WordCardState[],
        } : lessonSaved.lessonType === "ankiType" ? {
                lessonType: "ankiType",
                lessonsByLevel: (lessonSaved as LessonWordsAnkiType).lessonsByLevel && (lessonSaved as LessonWordsAnkiType).lessonsByLevel.length > 0
                    && (lessonSaved as LessonWordsAnkiType).lessonsByLevel.map((l) => {
                    return {
                        lessonName: l.name,
                        lessonUUID: l.uuid,
                    };
                }) || [],
        } : {
                lessonType: "",
            }
        ),
    })


    const [nameError, setNameError] = useState("");
    const [h1Error, setH1Error] = useState("");
    const [tagTitleError, setTagTitleError] = useState("");
    const [tagDescriptionError, setTagDescriptionError] = useState("");
    const [errorEmptyCardsError, setErrorEmptyCards] = useState("");

    const [descriptionError, setDescriptionError] = useState("");

    const handleNewCard = () => {
        if (lessonState.lessonType === "byLevel") {
            setErrorEmptyCards("");
            const updatedCards = [
                ...(lessonState.cards || []),
                {
                    uuid: uuidv4(),
                    description: "Опис карти",
                    wordUUID: "",
                    wordName: "",
                    sortOrder: 0,
                },
            ];
            setLessonState({
                ...lessonState,
                cards: updatedCards,
            });
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(lessonState.lessonType === "byLevel" && !lessonState.cards || lessonState.cards.length === 0) {
            setErrorEmptyCards("Необхідно створити мінімум 1 карту!");
        }
        try {
            const response = await saveWordLessonAPI(lessonState, lessonSaved.uuid);
                    if (response?.status === 200) {
                        toast.success(response.general);
                        setDescriptionError("");
                        // setTitleError("");
                        // setWordError("");
                    }
                    if (response?.status === 400) {
                        setDescriptionError(response?.htmlTagDescription);
                        // setTitleError(response?.htmlTagTitle);
                        // setWordError(response?.general);
                        toast.error("Є помилки при введенні даних!");
                    }

        } catch (error) {
            toast.error("Помилка сервера!!!");
        }
    }


    console.log(JSON.stringify(lessonSaved));

    return (
        <>
            <ToastContainer autoClose={3000} transition={Zoom}/>
            <div className="d-flex justify-content-between top-admin-block">
                <ButtonBack backURL="/admin/word-lessons"/>
                <div className="center">
                    <h1>Редагування сторінки словника</h1>
                </div>
                <button form="form" type="submit" className="right save">
                    <ReactSVG src="/images/save.svg" className="back-arrow-color" beforeInjection={(svg) => {
                        svg.setAttribute('style', 'width: 35px')
                        svg.setAttribute('style', 'height: 35px')
                    }}/>
                </button>
            </div>
            <div className="block-form">
                <form id="form" className="d-flex flex-row mt-3" onSubmit={handleSubmit}>
                    <div className="col-md-9 col-12">
                        {lessonState.lessonType === "byLevel" &&  (lessonState as LessonWordsByLevel).cards && (lessonState as LessonWordsByLevel).cards.length > 0
                            && (lessonState as LessonWordsByLevel).cards.map((card, cIdx) => {
                                return (
                                    <div key={card.uuid}
                                         style={{padding: 5, margin: 5, border: "1px solid #19a68c", borderRadius: 20}}>
                                        <WordLessonCardEdit
                                            card={card}
                                            setCard={(card) => {
                                                if(!card) {
                                                    const updatedCards = lessonState.cards.filter(
                                                        (_, index) => index !== cIdx );
                                                    setLessonState({
                                                        ...lessonState,
                                                        cards: updatedCards,
                                                    });
                                                    return;
                                                }
                                                lessonState.cards[cIdx] = card
                                                setLessonState({...lessonState})
                                            }}
                                            // updateCard={updateCard}
                                        />
                                        {/*<button type="button" onClick={() => deleteCard(card.uuid)} className="b-curt-delete">X</button>*/}
                                    </div>
                                )
                            })}
                        <div className="d-flex new-wl-border">
                            <label className="me-auto">Додати нову картку до уроку: </label>
                            <button type="button" onClick={handleNewCard}>
                                <ReactSVG src="/images/plus.svg" className="back-arrow-color"/>
                            </button>
                        </div>
                        { errorEmptyCardsError && <ShowErrorMessage error={errorEmptyCardsError} /> }
                    </div>

                    <div className="col-md-3 col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3">
                    <div className="d-flex flex-column w-100 align-items-start">
                            <label htmlFor="page">Тип урока*</label>
                            <select id="page" name="categoryPage" className="w-100"
                                    value={lessonState.lessonType ?? "byLevel"}
                                    onChange={(e) => {
                                        setLessonState({...lessonState, lessonType: e.target.value})
                                    }}
                            >
                                <option></option>
                                <option value="byLevel">По карткам</option>
                                <option value="ankiType">Тип Anki</option>

                            </select>
                        </div>
                        <div className="d-flex flex-column w-100">
                            <div className="d-flex flex-column">
                                <label className="me-auto">Назва уроку*: </label>
                                <input type="text"
                                       value={lessonState.name}
                                       onChange={(e) => {
                                           setLessonState({...lessonState, name: e.target.value});
                                       }}
                                       required={true}/>
                            </div>
                        </div>
                        <div className="d-flex flex-column w-100">
                            <div className="d-flex flex-column">
                                <label className="me-auto">H1 уроку*: </label>
                                <input type="text"
                                       value={lessonState.seoObject.h1}
                                       onChange={(e) => {
                                           const seo = lessonState.seoObject;
                                           seo.h1 = e.target.value;
                                           setLessonState({...lessonState, seoObject: seo});
                                       }}
                                       maxLength={80}
                                       required={true}/>
                            </div>
                        </div>
                        <div className="d-flex flex-column w-100" style={{height: 120}}>
                            <div className="d-flex flex-column">
                                <label className="me-auto">Опис уроку: </label>
                                <textarea style={{height: 80}}
                                          value={lessonState.description}
                                          onChange={(e) => {
                                              setLessonState({...lessonState, description: e.target.value});
                                          }}
                                          maxLength={250}
                                          cols={4}
                                />
                            </div>
                        </div>
                        <div className="d-flex flex-column w-100">
                            <div className="d-flex flex-column">
                                <label className="me-auto">Порядок сортування: </label>
                                <input type="number"
                                       value={lessonState.sortOrder}
                                       onChange={(e) => {
                                           setLessonState({...lessonState, sortOrder: +e.target.value});
                                       }}
                                />
                            </div>
                        </div>

                        <div className="col-12 d-flex flex-column align-items-start gap-2 counter-box">
                            <div className="d-flex flex-column align-items-start w-100">
                                <label>Html tag «Title»:</label>
                                <textarea className="w-100" name="name"
                                          value={lessonState.seoObject.htmlTagTitle}
                                          onChange={(e) => {
                                              const seo = lessonState.seoObject;
                                              seo.htmlTagTitle = e.target.value;
                                              setLessonState({...lessonState, seoObject: seo});
                                          }}
                                          maxLength={200}
                                />
                                <span className="counter-text text-end">
                                     <span>{lessonState.seoObject?.htmlTagTitle.length ?? 0}</span>
                                        /
                                    <span>200</span>
                            </span>
                            </div>
                        </div>
                        {!!tagTitleError && <p className="p_error ms-3">{tagTitleError}</p>}

                        <div className="col-12 d-flex flex-column align-items-start gap-2 counter-box">
                            <div className="d-flex flex-column align-items-start w-100">
                                <label>Html tag «Description»:</label>
                                <textarea className="w-100" name="name"
                                          value={lessonState.seoObject.htmlTagDescription}
                                          onChange={(e) => {
                                              const seo = lessonState.seoObject;
                                              seo.htmlTagDescription = e.target.value;
                                              setLessonState({...lessonState, seoObject: seo});
                                          }}
                                          maxLength={360}
                                />
                                <span className="counter-text text-end">
                                     <span>{lessonState.seoObject?.htmlTagDescription.length ?? 0}</span>
                                        /
                                    <span>360</span>
                                </span>
                            </div>
                        </div>

                        {!!tagDescriptionError && <p className="p_error ms-3">{tagDescriptionError}</p>}

                        <SearchCategory
                            title={"Категорія*"}
                            placeholder={"Знайти категорію..."}
                            categoryPage={"LESSON_WORDS"}
                            categoryName={lessonState.categoryName}
                            setCategoryName={(name) => {
                                setLessonState({...lessonState, categoryName: name});
                            }}
                            setCategoryUUID={(uuid) => {
                                const state = lessonState;
                                state.categoryUUID = uuid;
                                setLessonState(state);
                            }}
                        />
                    </div>
                </form>
            </div>
        </>
    );
};