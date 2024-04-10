'use client'

import {ButtonBack} from "@/components/admin/ButtonBack";
import TinyMCEEditor from "@/app/TinyMCEEditor";
import React, {ChangeEvent, FormEvent, useState} from "react";
// import "../../categories/categories.style.css"
import 'react-toastify/dist/ReactToastify.css';
import {ReactSVG} from "react-svg";
import {Article, ArticleResponse, Category} from "@/app/DefaultResponsesInterfaces";
import {toast, ToastContainer, Zoom} from "react-toastify";
import {saveArticleAPI} from "@/app/(protected)/admin/articles/article/[uuid]/saveArticleAPI";

export const ArticleForm = ({articleResponse}: { articleResponse: ArticleResponse }) => {

    const imgUrl = articleResponse.article.image ? `/api/webimg/${articleResponse.article.image.imageName}` : "";

    const [textContent, setTextContent] = useState<string>(articleResponse.article.description);
    const [tagTitle, setTagTitle] = useState(articleResponse.article.htmlTagTitle || "");
    const [tagDescription, setTagDescription] = useState(articleResponse.article.htmlTagDescription || "");
    const [h1, setH1] = useState(articleResponse.article.h1);
    const [uuid, setUuid] = useState(articleResponse.article.uuid);
    const [image, setImage] = useState<File>();

    const [subCategories, setSubcategories] = useState<Category[]>();
    const [selectMainCategory, setSelectMainCategory] = useState<Category>();
    const [selectSubcategory, setSelectSubcategory] = useState<Category>();

    const [imageURL, setImageURL] = useState<string>(imgUrl);
    const [visit, setVisit] = useState(false);

    const blockVisit = visit ? "block-h visit" : "block-h";

    const [h1Error, setH1Error] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [titleError, setTitleError] = useState("");
    // const [generalError, setGeneralError] = useState("");

    const handleClickVisit = () => {
        setVisit(!visit);
    }

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
        articleResponse.mainCategories.forEach(category => {
            if (category.uuid === uuid) {
                setSelectMainCategory(category);
                setSubcategories(category.subcategories);
                return;
            }
        });
    };

    const handleSelectSubcategory = (uuid: string) => {
        subCategories?.forEach(category => {
            if (category.uuid === uuid) {
                setSelectSubcategory(category);
                return;
            }
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // setDisabled(true);
        const selectCategory = !!selectSubcategory ? selectSubcategory : !!selectMainCategory ? selectMainCategory : null;

        const article = {
            uuid: uuid,
            h1: h1,
            description: textContent,
            htmlTagDescription: tagDescription,
            htmlTagTitle: tagTitle,
            category: selectCategory,
        } as Article;
        var formData = new FormData;
        formData.append('image', image as Blob);
        formData.append('article', new Blob([JSON.stringify(article)], {type: 'application/json'}));
        try {
            const response = await saveArticleAPI(formData, uuid);
            if(response?.status ===200) {
                toast.success(response.general);
                setDescriptionError("");
                setTitleError("");
                setH1Error("");
            }
            if (response?.status === 400) {
                setDescriptionError(response?.htmlTagDescription);
                setTitleError(response?.htmlTagTitle);
                setH1Error(response?.h1);
                toast.error("Є помилки при введенні даних!");
            }
            // setDisabled(false);

        } catch (error) {
            // setDisabled(false);
            // console.log("Server error: " + error)

        }
    }

    return (
        <>
            <ToastContainer autoClose={3000} transition={Zoom}/>
            <div className="d-flex justify-content-between top-admin-block">
                <ButtonBack backURL="/admin/app-pages/contents"/>
                <div className="center">
                    <h1>Редагування статті</h1>
                </div>
                <button form="form" type="submit" className="right save">
                    <ReactSVG src="/images/save.svg" className="back-arrow-color" beforeInjection={(svg) => {
                        svg.setAttribute('style', 'width: 35px')
                        svg.setAttribute('style', 'height: 35px')
                    }}/>
                </button>
            </div>
            <div className="category-tree">
                <form id="form" className=" d-flex flex-row mt-3" onSubmit={handleSubmit}>

                    <div className="col-md-9 col-12">
                        <TinyMCEEditor onContentChange={handleContentChange} initialValue={textContent}/>
                    </div>

                    <div className="col-md-3 col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3">
                        <div className="d-flex flex-column align-items-start w-100">
                            <label>H1</label>
                            <input type="text" className="w-100" name="name" value={h1}
                                   onChange={(e) => setH1(e.target.value)}/>
                        </div>
                        {!!h1Error && <p className="p_error ms-3">{h1Error}</p>}
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
                            {articleResponse.article.category &&
                                <span style={{paddingLeft: 10, color: "#307ed9"}}>{articleResponse.article.category.name}</span>
                            }
                        </label>

                        <select className="w-100" onChange={(e) => handleSelectMainCategory(e.target.value)}>
                            <option>Батьківська категорія</option>
                            {articleResponse.mainCategories && articleResponse.mainCategories.length > 0 &&
                                articleResponse.mainCategories.map(category => (
                                    <option key={category.uuid} value={category.uuid}>
                                        {category.name}
                                    </option>
                                ))}

                        </select>

                        <select className="w-100" onChange={(e) => handleSelectSubcategory(e.target.value)}>
                            <option>Оберіть підкатегорію</option>
                            {subCategories && subCategories.length > 0 &&
                                subCategories.map(category => (
                                    <option key={category.uuid} value={category.uuid}>
                                        {category.name}
                                    </option>
                                ))}

                        </select>

                        {/*<label>Сторінка вивода:*/}
                        {/*    /!*{selectedPage &&*!/*/}
                        {/*    /!*    <span style={{paddingLeft: 10, color: "#307ed9"}}>{selectedPage.url}</span>*!/*/}
                        {/*    /!*}*!/*/}
                        {/*</label>*/}

                        {/*<select className="w-100" onChange={(e) => handleSelectPage(e.target.value)}>*/}
                        {/*    <option>Змінити сторінку</option>*/}
                        {/*    /!*{pageContent.applicationPages && pageContent.applicationPages.length > 0 &&*!/*/}
                        {/*    /!*    pageContent.applicationPages.map(appPage => (*!/*/}
                        {/*    /!*        <option key={appPage.uuid} value={appPage.uuid}>*!/*/}
                        {/*    /!*            {appPage.url}*!/*/}
                        {/*    /!*        </option>*!/*/}
                        {/*    /!*    ))}*!/*/}

                        {/*</select>*/}

                        <div className="d-flex flex-column w-100 align-items-start gap-2">
                            {/*<label htmlFor="page">Позиція контента:*/}
                            {/*{selectedPositionContent && selectedPositionContent.length > 0 &&*/}
                            {/*    <span*/}
                            {/*        style={{paddingLeft: 10, color: "#307ed9"}}>{selectedPositionContent[0]}</span>*/}
                            {/*}</label>*/}
                            {/*<select id="page" name="categoryPage" className="w-100"*/}
                            {/*        onChange={(e) => setPositionContent([e.target.value])}>*/}
                            {/*    <option>Змінити позицію контента</option>*/}
                            {/*    <option value="TOP">Верх</option>*/}
                            {/*    <option value="BOTTOM">Низ</option>*/}
                            {/*</select>*/}
                        </div>

                        <div className="d-flex flex-column align-items-start w-100 pt-2">
                            <button type="button" className="w-100 d-flex flex-row br-g" onClick={handleClickVisit}>
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
                                        <img src={imageURL} alt="Uploaded Image" className="category-edit-img"/>}
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