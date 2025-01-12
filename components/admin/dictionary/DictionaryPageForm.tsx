'use client'

import {ButtonBack} from "@/components/admin/ButtonBack";
import TinyMCEEditor from "@/app/TinyMCEEditor";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {ReactSVG} from "react-svg";
import {Category, DictionaryPage, EntityAndMainCategoriesResp, Word} from "@/app/DefaultResponsesInterfaces";
import {toast, ToastContainer, Zoom} from "react-toastify";
import {SearchWord} from "@/components/admin/dictionary/SearchWord";
import {WordSearchResult} from "@/components/admin/dictionary/WordSearchResult";
import {
    saveDictionaryPageAPI
} from "@/app/(protected)/admin/dictionary-pages/dictionary-page/[uuid]/saveDictionaryPageAPI";

export const DictionaryPageForm = ({dictionaryPageResp}: {dictionaryPageResp: EntityAndMainCategoriesResp<DictionaryPage>}) => {

    const dictionaryPage = dictionaryPageResp.t;

    const imgUrl = dictionaryPage.image ? `/api/webimg/${dictionaryPage.image.imageName}` : "";

    const [words, setWords] = useState<Word[]>();
    const [word, setWord] = useState<Word>(dictionaryPage.word);
    const [wordError, setWordError] = useState<string>();

    const [textContent, setTextContent] = useState<string>(dictionaryPage.description);
    const [partOfSpeech, setPartOfSpeech] = useState<string>(dictionaryPage.partOfSpeech);
    const [tagTitle, setTagTitle] = useState(dictionaryPage.htmlTagTitle || "");
    const [tagDescription, setTagDescription] = useState(dictionaryPage.htmlTagDescription || "");
    const [published, setPublished] = useState(dictionaryPage.published);
    const [uuid, setUuid] = useState(dictionaryPage.uuid);
    const [image, setImage] = useState<File>();
    const [articleCategory, setArticleCategory] = useState(dictionaryPage.category);

    const [subCategories, setSubcategories] = useState<Category[]>();
    const [selectMainCategory, setSelectMainCategory] = useState<Category>();
    const [selectSubcategory, setSelectSubcategory] = useState<Category>();
    const [selectSubSubcategory, setSelectSubSubcategory] = useState<Category>();


    const [imageURL, setImageURL] = useState<string>(imgUrl);
    const [visit, setVisit] = useState(false);

    const blockVisit = visit ? "block-h mt-2 visit" : "block-h";

    const [descriptionError, setDescriptionError] = useState("");
    const [titleError, setTitleError] = useState("");

    useEffect(() => {
        if (!!word) {
            setWords([]);
        }
    }, [word]);


    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setImage(file);
        const reader = new FileReader();

        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                setImageURL(reader.result);
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleContentChange = (newContent: string) => {
        setTextContent(newContent);
    };

    const handleSelectMainCategory = (uuid: string) => {
        dictionaryPageResp.mainCategories.forEach(category => {
            if (category.uuid === uuid) {
                setSelectMainCategory(category);
                setArticleCategory(category);
                setSubcategories(category.subcategories);
                return;
            }
            if (!uuid) {
                setArticleCategory(dictionaryPage.category);
            }
        });
    };

    const handleSelectSubcategory = (uuid: string) => {
        subCategories?.forEach(category => {
            if (category.uuid === uuid) {
                setSelectSubcategory(category);
                setArticleCategory(category);
                return;
            }
            if (!uuid && selectMainCategory) {
                setArticleCategory(selectMainCategory);
                return;
            }

        });
    };

    const handleSelectSubSubcategory = (uuid: string) => {
        selectSubcategory?.subcategories?.forEach(category => {
            if (category.uuid === uuid) {
                setSelectSubSubcategory(category);
                setArticleCategory(category);
                return;
            }
            if (!uuid && selectMainCategory) {
                setArticleCategory(selectMainCategory);
                return;
            }

        });
    };

    const handleClickWordDelete = () => {
        setWord(dictionaryPage.word);
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (word) {
            const selectCategory = !!selectSubSubcategory ? selectSubSubcategory : !!selectSubcategory ? selectSubcategory : !!selectMainCategory ? selectMainCategory : null;

            const dictionaryPage = {
                uuid: uuid,
                description: textContent,
                partOfSpeech: partOfSpeech,
                htmlTagDescription: tagDescription,
                htmlTagTitle: tagTitle,
                published: published,
                word: word,
                category: selectCategory,
            } as DictionaryPage;
            var formData = new FormData;
            formData.append('image', image as Blob);
            formData.append('dictionaryPage', new Blob([JSON.stringify(dictionaryPage)], {type: 'application/json'}));
            try {
                const response = await saveDictionaryPageAPI(formData, uuid);
                if (response?.status === 200) {
                    toast.success(response.general);
                    setDescriptionError("");
                    setTitleError("");
                    setWordError("");
                }
                if (response?.status === 400) {
                    setDescriptionError(response?.htmlTagDescription);
                    setTitleError(response?.htmlTagTitle);
                    setWordError(response?.general);
                    toast.error("Є помилки при введенні даних!");
                }

            } catch (error) {
                toast.error("Помилка сервера!!!");

            }
        } else {
        setWordError("Оберіть будь ласка слово для словника");
        toast.error("Є помилки при введенні даних!");
        }
    }

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
                        <label>Частка мови</label>
                        <TinyMCEEditor onContentChange={setPartOfSpeech} initialValue={partOfSpeech} height={"500px"} id={"1"}/>
                        <br/>
                        <label>Приклади з перекладом</label>
                        <TinyMCEEditor onContentChange={handleContentChange} initialValue={textContent} height={"500px"} id={"2"}/>
                    </div>

                    <div className="col-md-3 col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3">
                        <div className="d-flex flex-column w-100" style={{height: 90}}>
                            <div className="d-flex flex-row">
                                <label className="">Слово сторінки словника: </label>
                                <div className="needs"></div>
                            </div>
                            <SearchWord onSearch={setWords}/>
                            {words && words.length > 0 && <div className="col-md-2 search__result flex-column">
                                {words.map(word => (
                                    <div key={word.uuid}>
                                        <WordSearchResult word={word} wordChange={setWord}/>
                                    </div>
                                ))}
                            </div>}
                            {word && <div className="d-flex flex-row gap-2">
                                <label>Вибрано слово: </label>
                                <span style={{color: "#0d93dc"}}>{word.name}</span>
                                <button type="button" onClick={handleClickWordDelete} className="delete__b">X</button>
                            </div>}
                        </div>
                        {!!wordError && <p className="p_error ms-3">{wordError}</p>}

                        <div className="col-12 d-flex flex-column align-items-start gap-2 counter-box">
                            <div className="d-flex flex-column align-items-start w-100">
                                <label>Html tag «Title»</label>
                                <textarea className="w-100" name="name" value={tagTitle}
                                          onChange={(e) => setTagTitle(e.target.value)}/>
                                <span className="counter-text text-end">
                                     <span>{tagTitle.length}</span>
                                        /
                                    <span>360</span>
                            </span>
                            </div>
                        </div>
                        {!!titleError && <p className="p_error ms-3">{titleError}</p>}

                        <div className="col-12 d-flex flex-column align-items-start gap-2 counter-box">
                            <div className="d-flex flex-column align-items-start w-100">
                                <label>Html tag «Description»</label>
                                <textarea className="w-100" name="name" value={tagDescription}
                                          onChange={(e) => setTagDescription(e.target.value)}/>
                                <span className="counter-text text-end">
                                     <span>{tagDescription.length}</span>
                                        /
                                    <span>360</span>
                            </span>
                            </div>
                        </div>
                        {!!descriptionError && <p className="p_error ms-3">{descriptionError}</p>}

                        <label>Категорія:
                            {articleCategory &&
                                <span style={{paddingLeft: 10, color: "#307ed9"}}>{articleCategory.name}</span>
                            }
                        </label>

                        <select className="w-100" onChange={(e) => handleSelectMainCategory(e.target.value)}>
                            <option value="">Оберіть категорію</option>
                            {dictionaryPageResp.mainCategories && dictionaryPageResp.mainCategories.length > 0 &&
                                dictionaryPageResp.mainCategories.map(category => (
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

                        <select className="w-100" onChange={(e) => handleSelectSubSubcategory(e.target.value)}>
                            <option value="">Оберіть категорію підкатегорії</option>
                            {selectSubcategory && selectSubcategory.subcategories.length > 0 &&
                                selectSubcategory.subcategories.map(category => (
                                    <option key={category.uuid} value={category.uuid}>
                                        {category.name}
                                    </option>
                                ))}

                        </select>
                        <div className="d-flex flex-row w-100 align-items-center">
                            <span className="me-auto">Опубліковано (так\ні):</span>
                            <input id="toggleSwitch" type="checkbox" checked={published} className="toggle-switch"
                                   name="showDescriptionInPage"
                                   onChange={(e) => setPublished(e.target.checked)}/>
                            <label htmlFor="toggleSwitch" className="toggle-switch-label"></label>
                        </div>


                        <div className="d-flex flex-column align-items-start w-100 pt-2">
                            <button type="button" className="w-100 d-flex flex-row br-g" onClick={() => setVisit(!visit)}>
                                <span className="align-items-start">Зображення категорії</span>
                                <ReactSVG src="/images/arrow-down.svg" className="color-arrow-svg ms-auto"
                                          beforeInjection={(svg) => {
                                              svg.setAttribute('style', 'width: 15px')
                                              svg.setAttribute('style', 'height: 15px')
                                          }}/>
                            </button>
                            <div className={blockVisit}>
                                <input type="file" className="w-100" accept="image/*" onChange={handleImageChange}/>
                                <div className="category-edit-img-container">
                                    {imageURL &&
                                        <img src={imageURL} alt="Uploaded Image" className="block-edit-img"/>
                                    }
                                </div>
                                <div className="d-flex w-100 pt-2">

                                    <input className="w-40 " type="text" placeholder="width"/>
                                    <input className="w-40 ms-auto" type="text" placeholder="height"/>

                                </div>
                            </div>
                        </div>
                    </div>
                    <input type="hidden" name="uuid" value={uuid} onChange={(e) => setUuid(e.target.value)}/>
                </form>
            </div>
        </>
    );
};