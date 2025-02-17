'use client'

import {ButtonBack} from "@/components/admin/ButtonBack";
import TinyMCEEditor from "@/app/TinyMCEEditor";
import React, { FormEvent, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {ReactSVG} from "react-svg";
import { SEOObject} from "@/app/DefaultResponsesInterfaces";
import {toast, ToastContainer, Zoom} from "react-toastify";
import {SearchWord} from "@/components/admin/dictionary/SearchWord";
import {DictionaryPage} from "@/app/(protected)/admin/dictionary-pages/dictionary-page/[uuid]/getDictionaryPage";
import {SearchCategory} from "@/app/(protected)/admin/categories/category/[uuid]/SearchCategory";
import {AiGemini} from "@/components/images/AiGemini";
import {fetchDictionaryAi} from "@/app/(protected)/admin/dictionary-pages/dictionary-page/[uuid]/fetchDictionaryAi";
import {ShowErrorMessage} from "@/components/ShowErrorMessage";
import {
    SaveDictionaryErrors,
    saveDictionaryPage
} from "@/app/(protected)/admin/dictionary-pages/dictionary-page/[uuid]/saveDictionaryPage";

export type DictionaryPageState = {
    uuid: string;
    name: string;
    published: boolean;
    categoryUUID: string;
    categoryName: string;
    wordUUID: string;
    wordName: string;
    seoObject: SEOObject;
}

export function DictionaryPageForm( props:{ dictionaryPageResp: DictionaryPage}) {

    const [dictionaryPageSaved, setDictionaryPageSaved] = useState(props.dictionaryPageResp);

    const [description, setDescription] = useState<string>(dictionaryPageSaved.description);
    const [partOfSpeech, setPartOfSpeech] = useState<string>(dictionaryPageSaved.partOfSpeech);
    const [dictionaryPageState, setDictionaryPageState] = useState<DictionaryPageState>({
        uuid: dictionaryPageSaved.uuid,
        name: dictionaryPageSaved.name,
        published: dictionaryPageSaved.published,
        categoryUUID: dictionaryPageSaved.categoryUUID || "",
        categoryName: dictionaryPageSaved.categoryName || "",
        wordUUID: dictionaryPageSaved.word?.uuid ?? "",
        wordName: dictionaryPageSaved.word?.name ?? "",
        seoObject: {
            h1: dictionaryPageSaved.seoObject?.h1 ?? "",
            htmlTagTitle: dictionaryPageSaved.seoObject?.htmlTagTitle ?? "",
            htmlTagDescription: dictionaryPageSaved.seoObject?.htmlTagDescription ?? "",
        } as SEOObject,
    });

    const [wordError, setWordError] = useState<string>("");
    const [errors, setErrors] = useState<SaveDictionaryErrors | undefined>();


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (dictionaryPageState.wordUUID) {
            const dictionary: Record<string, any> = {
                uuid: dictionaryPageSaved.uuid,
                name: dictionaryPageState.name,
                description: description,
                partOfSpeech: partOfSpeech,
                seoObject: {
                    htmlTagDescription: dictionaryPageState.seoObject.htmlTagDescription,
                    htmlTagTitle: dictionaryPageState.seoObject.htmlTagTitle,
                },
                wordUUID: dictionaryPageState.wordUUID,
                categoryUUID: dictionaryPageState.categoryUUID,
                categoryName: dictionaryPageState.categoryName,
                published: dictionaryPageState.published,

            }
            const res = await saveDictionaryPage(dictionary, dictionaryPageSaved.uuid);
                if (res.ok) {
                    toast.success(res.ok.localizedMessage);
                    setWordError("");
                    return;
                }
                setErrors(res.err ? res.err : undefined);
                toast.error("Є помилки при введенні даних або помилка  сервера!");
        } else {
        setWordError("Оберіть будь ласка слово для словника");
        toast.error("Є помилки при введенні даних!");
        }
    }

    async function onClickToFetchAI(e: React.MouseEvent<HTMLDivElement> , field: string) {
        e.preventDefault();
        if(field && dictionaryPageState.name) {
            const res = await fetchDictionaryAi(field, dictionaryPageState.name);
            if(field === "partOfSpeech" && res.ok) {
                setTimeout(() => {
                    setPartOfSpeech(res.ok);
                }, 200);
            }
            if(field === "description" && res.ok) {
                setTimeout(() => {
                    setDescription(res.ok);
                }, 200);
            }
            return;
        }
        setWordError("Оберіть слово до словника!");
    }

    // console.log(JSON.stringify(dictionaryPageState));
    // console.log(description);
    // console.log(partOfSpeech);

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
                <form id="form" className=" d-flex flex-row mt-3" onSubmit={handleSubmit}>
                    <div className="col-md-9 col-12">
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-row gap-4">
                                <label>Частка мови</label>
                                <div className="cursor-pointer"
                                     onClick={(e) => {
                                        onClickToFetchAI(e, "partOfSpeech");
                                     }}
                                >
                                    <AiGemini width={"30"} height={"30"} fill={"#24ee7f"}/>
                                </div>
                            </div>
                            {wordError && <ShowErrorMessage error={wordError}/>}
                        </div>

                        <TinyMCEEditor height={"500px"} id={"1"}
                                       initialValue={partOfSpeech}
                                       onContentChange={(text) => {
                                           setPartOfSpeech(text);
                                       }}
                        />
                        <br/>
                        <div className="d-flex flex-row gap-4">
                            <label>Приклади з перекладом</label>
                            <div className="cursor-pointer"
                                 onClick={(e) => {
                                     onClickToFetchAI(e, "description");
                                 }}
                            >
                                <AiGemini width={"30"} height={"30"} fill={"#24ee7f"}/>
                            </div>
                        </div>
                        {wordError && <ShowErrorMessage error={wordError}/>}
                        <TinyMCEEditor height={"500px"} id={"2"}
                                       initialValue={description}
                                       onContentChange={(text) => {
                                           setDescription(text);
                                       }}
                        />
                    </div>

                    <div className="col-md-3 col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3">
                        <div className="d-flex flex-column w-100">
                            <div className="d-flex flex-row">
                                <label className="">Слово сторінки словника: </label>
                                <div className="needs"></div>
                            </div>

                            <SearchWord
                                searchTo={"dictionary"}
                                wordName={dictionaryPageState.wordName}
                                wordUUID={dictionaryPageState.wordUUID}
                                setWordUUID={(uuid) => {
                                    const tempState = dictionaryPageState;
                                    tempState.wordUUID = uuid;
                                    setDictionaryPageState(tempState);
                                }}
                                setWordName={(name) => {
                                    setDictionaryPageState({...dictionaryPageState, wordName: name, name: name});
                                    setWordError("");
                                }}
                            />
                        </div>
                        {wordError  && <ShowErrorMessage error={wordError} />}
                        {errors?.wordUUID && <ShowErrorMessage error={errors?.wordUUID} />}

                        <div className="col-12 d-flex flex-column align-items-start gap-2 counter-box">
                            <div className="d-flex flex-column align-items-start w-100">
                                <label>Html tag «Title»</label>
                                <textarea className="w-100" name="name" value={dictionaryPageState.seoObject.htmlTagTitle}
                                          onChange={(e) => {
                                              const seo = dictionaryPageState.seoObject;
                                              seo.htmlTagTitle = e.target.value;
                                              setDictionaryPageState({...dictionaryPageState, seoObject: seo})
                                          }}
                                />
                                <span className="counter-text text-end">
                                     <span>{dictionaryPageState.seoObject.htmlTagTitle.length}</span>
                                        /
                                    <span>360</span>
                            </span>
                            </div>
                        </div>
                        {errors?.seoObject?.htmlTagTitle && <ShowErrorMessage error={errors?.seoObject?.htmlTagTitle} />}

                        <div className="col-12 d-flex flex-column align-items-start gap-2 counter-box">
                            <div className="d-flex flex-column align-items-start w-100">
                                <label>Html tag «Description»</label>
                                <textarea className="w-100" name="name"
                                          value={dictionaryPageState.seoObject.htmlTagDescription}
                                          onChange={(e) => {
                                              const seo = dictionaryPageState.seoObject;
                                              seo.htmlTagDescription = e.target.value;
                                              setDictionaryPageState({...dictionaryPageState, seoObject: seo})
                                          }}
                                />
                                <span className="counter-text text-end">
                                     <span>{dictionaryPageState.seoObject.htmlTagDescription.length}</span>
                                        /
                                    <span>360</span>
                            </span>
                            </div>
                        </div>
                        {errors?.seoObject?.htmlTagDescription && <ShowErrorMessage error={errors?.seoObject?.htmlTagDescription} />}

                        <SearchCategory
                            title={"Категорія*"}
                            placeholder={"Знайти категорію..."}
                            categoryPage={"DICTIONARY_PAGE"}
                            categoryName={dictionaryPageState.categoryName}
                            setCategoryName={(name) => {
                                setDictionaryPageState({...dictionaryPageState, categoryName: name});
                            }}
                            setCategoryUUID={(uuid) => {
                                const state = dictionaryPageState;
                                state.categoryUUID = uuid;
                                setDictionaryPageState(state);
                            }}
                        />
                        <div className="d-flex flex-row w-100 align-items-center">
                            <span className="me-auto">Опубліковано (так\ні):</span>
                            <input // name="published"
                                id="toggleSwitch" type="checkbox" className="toggle-switch"
                                checked={dictionaryPageState.published}
                                   onChange={(e) => setDictionaryPageState({...dictionaryPageState, published: e.target.checked})}
                            />
                            <label htmlFor="toggleSwitch" className="toggle-switch-label"></label>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}