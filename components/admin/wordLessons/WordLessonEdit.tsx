'use client'

import React, {FormEvent, useState} from "react";
import {Category, EntityAndMainCategoriesResp, WordLesson, WordLessonCard} from "@/app/DefaultResponsesInterfaces";
import {ToastContainer, Zoom} from "react-toastify";
import {ButtonBack} from "@/components/admin/ButtonBack";
import {ReactSVG} from "react-svg";
import "./word-lesson.style.css"
import {WordLessonCardEdit} from "@/components/admin/wordLessons/WordLessonCardEdit";
import {v4 as uuidv4} from 'uuid';

export const WordLessonEdit = ({wordLessonResp}: { wordLessonResp: EntityAndMainCategoriesResp<WordLesson> }) => {

    const wordLesson = wordLessonResp.t;

    const [uuid, setUuid] = useState(wordLesson.uuid);
    const [cards, setCards] = useState<WordLessonCard[]>(wordLesson.cards);
    const [name, setName] = useState(wordLesson.name);
    const [description, setDescription] = useState(wordLesson.description);
    const [sortOrder, setSortOrder] = useState(wordLesson.sortOrder);


    const [wordLessonCategory, setWordLessonCategory] = useState(wordLesson.category);

    const [subCategories, setSubcategories] = useState<Category[]>();
    const [selectMainCategory, setSelectMainCategory] = useState<Category>();
    const [selectSubcategory, setSelectSubcategory] = useState<Category>();


    const handleNewCard = () => {
        setCards(prevCards => prevCards.concat({uuid: uuidv4(), description: "enter description", sortOrder: 0} as WordLessonCard));
    }


    const handleSelectMainCategory = (uuid: string) => {
        wordLessonResp.mainCategories.forEach(category => {
            if (category.uuid === uuid) {
                setSelectMainCategory(category);
                setWordLessonCategory(category);
                setSubcategories(category.subcategories);
                return;
            }
            if (!uuid) {
                setWordLessonCategory(wordLesson.category);
            }
        });
    };

    const handleSelectSubcategory = (uuid: string) => {
        subCategories?.forEach(category => {
            if (category.uuid === uuid) {
                setSelectSubcategory(category);
                setWordLessonCategory(category);
                return;
            }
            if (!uuid && selectMainCategory) {
                setWordLessonCategory(selectMainCategory);
                return;
            }

        });
    };


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
            const selectCategory = !!selectSubcategory ? selectSubcategory : !!selectMainCategory ? selectMainCategory : null;

            const wordLesson = {
                uuid: uuid,
                name: name,
                description: description,
                sortOrder: sortOrder,
                cards: cards,
                category: selectCategory,
            } as WordLesson;
        //     var formData = new FormData;
        //     formData.append('image', image as Blob);
        //     formData.append('dictionaryPage', new Blob([JSON.stringify(dictionaryPage)], {type: 'application/json'}));
        //     try {
        //         const response = await saveDictionaryPageAPI(formData, uuid);
        //         if (response?.status === 200) {
        //             toast.success(response.general);
        //             setDescriptionError("");
        //             setTitleError("");
        //             setWordError("");
        //         }
        //         if (response?.status === 400) {
        //             setDescriptionError(response?.htmlTagDescription);
        //             setTitleError(response?.htmlTagTitle);
        //             setWordError(response?.general);
        //             toast.error("Є помилки при введенні даних!");
        //         }
        //
        //     } catch (error) {
        //         toast.error("Помилка сервера!!!");
        //
        //     }

    }

    const updateCard = (updatedCard: WordLessonCard) => {
        setCards(prevCards => {
            const index = prevCards.findIndex(card => card.uuid === updatedCard.uuid);
            if (index === -1) {
                return prevCards;
            }
            const newCards = [...prevCards];
            newCards[index] = updatedCard;
            return newCards;

        });
    }
    const deleteCard = (uuidToRemove: string) => {
        setCards(prevCards => {
            const currentIndex = prevCards.findIndex(card => card.uuid === uuidToRemove);
            if (currentIndex === -1) {
                return prevCards;
            }
            return prevCards.filter((_, index) => index !== currentIndex);
        });
    }

    console.log(JSON.stringify(cards));
    return (
        <>
            <ToastContainer autoClose={3000} transition={Zoom}/>
            <div className="d-flex justify-content-between top-admin-block">
                <ButtonBack backURL="/admin/dictionary-pages"/>
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
                        {cards && cards.length > 0 && cards.map(card =>
                            <div key={card.uuid} style={{padding: 5, margin: 5, border: "1px solid", borderRadius: 20}}>
                                <WordLessonCardEdit card={card} updateCard={updateCard}>
                                    <button type="button" onClick={() => deleteCard(card.uuid)}>X</button>
                                </WordLessonCardEdit>
                            </div>
                        )}
                        <div className="d-flex new-wl-border">
                            <label className="me-auto">Додати нову картку до уроку: </label>
                            <button type="button" onClick={handleNewCard}>
                                <ReactSVG src="/images/plus.svg"  className="back-arrow-color" />
                            </button>
                        </div>
                    </div>

                    <div className="col-md-3 col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3">
                        <div className="d-flex flex-column w-100" style={{height: 90}}>
                            <div className="d-flex flex-column">
                                <label className="me-auto">Назва уроку: </label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                                       required={true}/>
                            </div>
                        </div>
                        <div className="d-flex flex-column w-100" style={{height: 90}}>
                            <div className="d-flex flex-column">
                                <label className="me-auto">Опис уроку: </label>
                                <textarea  value={description} onChange={(e) => setDescription(e.target.value)}
                                       style={{height: "auto"}}/>
                            </div>
                        </div>
                        <div className="d-flex flex-column w-100" style={{height: 90}}>
                            <div className="d-flex flex-column">
                                <label className="me-auto">Порядок сортування: </label>
                                <input type="number"  value={sortOrder} onChange={(e) => setSortOrder(+ e.target.value)} />
                            </div>
                        </div>
                        <label>Категорія:
                            {wordLessonCategory &&
                                <span style={{paddingLeft: 10, color: "#307ed9"}}>{wordLessonCategory.name}</span>
                            }
                        </label>

                        <select className="w-100" onChange={(e) => handleSelectMainCategory(e.target.value)}>
                            <option value="">Оберіть категорію</option>
                            {wordLessonResp.mainCategories && wordLessonResp.mainCategories.length > 0 &&
                                wordLessonResp.mainCategories.map(category => (
                                    <option key={category.uuid} value={category.uuid}>
                                        {category.name}
                                    </option>
                                ))}

                        </select>

                        <select className="w-100" onChange={(e) => handleSelectSubcategory(e.target.value)}>
                            <option value="">Оберіть підкатегорію</option>
                            {subCategories && subCategories.length > 0 &&
                                subCategories.map(category => (
                                    <option key={category.uuid} value={category.uuid}>
                                        {category.name}
                                    </option>
                                ))}

                        </select>

                    </div>
                    <input type="hidden" name="uuid" value={uuid} onChange={(e) => setUuid(e.target.value)}/>
                </form>
            </div>
        </>
    );
};