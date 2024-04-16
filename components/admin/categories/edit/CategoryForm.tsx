'use client'

import {ButtonBack} from "@/components/admin/ButtonBack";
import TinyMCEEditor from "@/app/TinyMCEEditor";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {ReactSVG} from "react-svg";
import {Category, CategoryResponse} from "@/app/DefaultResponsesInterfaces";
import {saveCategoryAPI} from "@/app/(protected)/admin/categories/category/[uuid]/saveCategoryAPI";
import Image from "next/image";
import {toast, ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../categories.style.css"


export const CategoryForm = ({categoryResponse}: { categoryResponse: CategoryResponse }) => {

    const imgUrl = categoryResponse.category.image ? `/api/category-img/${categoryResponse.category.image.imageName}` : "";

    const [textContent, setTextContent] = useState<string>(categoryResponse.category.description);
    const [mainCategory, setMainCategory] = useState(categoryResponse.category.mainCategory);
    const [showDescription, setShowDescription] = useState(true);
    const [tagTitle, setTagTitle] = useState(categoryResponse.category.htmlTagTitle || "");
    const [tagDescription, setTagDescription] = useState(categoryResponse.category.htmlTagDescription || "");
    const [selectedPage, setSelectedPage] = useState("NO_PAGE");
    const [name, setName] = useState(categoryResponse.category.name);
    const [uuid, setUuid] = useState(categoryResponse.category.uuid);
    const [image, setImage] = useState<File>();
    const [subCategories, setSubcategories] = useState<Category[]>();
    const [selectMainCategory, setSelectMainCategory] = useState<Category>();
    const [selectSubcategory, setSelectSubcategory] = useState<Category>();

    const [nameError, setNameError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [titleError, setTitleError] = useState("");

    const [imageURL, setImageURL] = useState<string>(imgUrl);
    const [visit, setVisit] = useState(false);

    const blockVisit = visit ? "block-h mt-2 visit" : "block-h";

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
        categoryResponse.mainCategories.forEach(category => {
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
        const parentCategory = !!selectSubcategory ? selectSubcategory : !!selectMainCategory ? selectMainCategory : null;
        const category = {
            uuid: uuid,
            name: name,
            description: textContent,
            htmlTagTitle: tagTitle,
            htmlTagDescription: tagDescription,
            mainCategory: mainCategory,
            parentCategory: parentCategory,
            categoryPage: [selectedPage],
        } as Category
        var formData = new FormData;
        formData.append('image', image as Blob);
        formData.append('category', new Blob([JSON.stringify(category)], {type: 'application/json'}));
        try {
            const response = await saveCategoryAPI(formData, uuid);
            if(response?.status ===200) {
                toast.success(response.general);
                setDescriptionError("");
                setTitleError("");
                setNameError("");
            }
            if(response?.status ===400) {
                setDescriptionError(response?.htmlTagDescription);
                setTitleError(response?.htmlTagTitle);
                setNameError(response?.name);
                toast.error("Є помилки при введенні даних!");
            }
            // setDisabled(false);
            // if(response) {
            //     // setRespData(response);
            // }
        } catch (error) {
            // setDisabled(false);
            // console.log("Server error: " + error)
            toast.error("Помилка сервера!!!");
        }
    }

    return (
        <>
            <ToastContainer autoClose={3000} transition={Zoom}/>
            <div className="d-flex justify-content-between top-admin-block">
                <ButtonBack backURL="/admin/categories"/>
                <div className="center">
                    <h1>Редагування категорії</h1>
                </div>
                {/*<ButtonNewCategory/>*/}
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
                        <TinyMCEEditor onContentChange={handleContentChange} initialValue={textContent}/>
                    </div>

                    <div className="col-md-3 col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3">
                        <div className="d-flex flex-column align-items-start w-100">
                            <label>Ім`я</label>
                            <input type="text" className="w-100" name="name" value={name}
                                   onChange={(e) => setName(e.target.value)}/>
                        </div>
                        {!!nameError && <p className="p_error ms-3">{nameError}</p>}

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

                        <div className="d-flex flex-column align-items-start w-100">
                            <label>Батьківська категорія</label>
                            <span className="d-flex align-items-start w-100"
                                  style={{borderBottom: "1px solid"}}>Відсутня</span>
                        </div>

                        <div className="d-flex flex-row w-100 align-items-center">
                            <span className="me-auto">Головна категорія: </span>
                            <input id="toggleSwitch" type="checkbox" checked={mainCategory} className="toggle-switch"
                                   name="mainCategory"
                                   onChange={(e) => setMainCategory(e.target.checked)}/>
                            <label htmlFor="toggleSwitch" className="toggle-switch-label"></label>

                        </div>

                        <div className="d-flex flex-row w-100 align-items-center">
                            <span className="me-auto">Опис на сторінці (так\ні):</span>
                            <input id="toggleSwitch" type="checkbox" checked={showDescription} className="toggle-switch"
                                   name="showDescriptionInPage"
                                   onChange={(e) => setShowDescription(e.target.checked)}/>
                            <label htmlFor="toggleSwitch" className="toggle-switch-label"></label>
                        </div>

                        <label>Змінити категорію</label>
                        <select className="w-100" onChange={(e) => handleSelectMainCategory(e.target.value)}>
                            <option>Батьківська категорія</option>
                            {categoryResponse.mainCategories && categoryResponse.mainCategories.length > 0 &&
                                categoryResponse.mainCategories.map(category => (
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

                        <div className="d-flex flex-column w-100 align-items-start">
                            <label htmlFor="page">Сторінка вивода</label>
                            <select id="page" name="categoryPage" className="w-100"
                                    onChange={(e) => setSelectedPage(e.target.value)}>
                                <option value="NO_PAGE">Оберіть сторінку вивода</option>
                                <option value="DICTIONARY_PAGE">Словник</option>
                                <option value="MINI_STORIES">Міні історії</option>
                                <option value="LESSON_WORDS">Заняття для слів</option>
                                <option value="LESSON_PHRASES">Заняття для фпаз</option>
                            </select>
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
                                        <Image unoptimized src={imageURL} alt="Uploaded Image" width="450" height="280"
                                               className="block-edit-img"/>}
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