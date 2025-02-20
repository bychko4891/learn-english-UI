'use client'

import {ButtonBack} from "@/components/admin/ButtonBack";
import TinyMCEEditor from "@/app/TinyMCEEditor";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {ReactSVG} from "react-svg";
import {Category, CategoryResponse, ImageAPI, SEOObject} from "@/app/DefaultResponsesInterfaces";
import {saveCategoryAPI} from "@/app/(protected)/admin/categories/category/[uuid]/saveCategoryAPI";
import Image from "next/image";
import {toast, ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../categories.style.css"
import {SearchCategory} from "@/app/(protected)/admin/categories/category/[uuid]/SearchCategory";
import {Storages} from "@/components/admin/Storages";

export type CategoryState = {
    uuid: string;
    name: string;
    sortOrder: number;
    // description: string;
    shortDescription: string;
    attentionText: string;
    mainCategory: boolean;
    showDescriptionInPage: boolean;
    parentCategoryUUID: string;
    parentCategoryName: string;
    categoryPage: string;
    image: ImageAPI;
    seoObject: SEOObject;
}

export const CategoryForm = ({category}: { category: Category }) => {

    const imgUrl = category.image ? `/api/i/${category.image.storageId}/image/${category.image.imageName}` : "";
    const [categorySaved, setCategorySaved] = useState<Category>(category);
    const [categoryState, setCategoryState] = useState<CategoryState>({
        uuid: categorySaved.uuid,
        name: categorySaved.name,
        sortOrder: categorySaved.sortOrder,
        // description: categorySaved.description,
        shortDescription: categorySaved.shortDescription,
        attentionText: categorySaved.attentionText,
        mainCategory: categorySaved.mainCategory,
        showDescriptionInPage: categorySaved.showDescriptionInPage,
        parentCategoryUUID: categorySaved.parentCategory?.uuid ? categorySaved.parentCategory?.uuid : "",
        // parentCategoryUUID: categorySaved.parentCategory?.uuid,
        parentCategoryName: categorySaved.parentCategory?.name ? categorySaved.parentCategory?.name : "",
        categoryPage: categorySaved.categoryPage,
        image: categorySaved.image ? categorySaved.image : {width: "", height: "", storageId: null} as ImageAPI,
        seoObject: {
            h1: categorySaved.seoObject?.h1 ?? "",
            htmlTagTitle: categorySaved.seoObject?.htmlTagDescription ?? "",
            htmlTagDescription: categorySaved.seoObject?.htmlTagDescription ?? "",
        } as SEOObject,
    });

    const [textContent, setTextContent] = useState<string>(categorySaved.description);
    const [image, setImage] = useState<File>();
    const [nameError, setNameError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [titleError, setTitleError] = useState("");

    const [imageURL, setImageURL] = useState<string>(imgUrl);
    const [visit, setVisit] = useState(false);


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


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // setDisabled(true);
        // const parentCategory = !!selectSubcategory ? selectSubcategory : !!selectMainCategory ? selectMainCategory : null;
        const category = {
            uuid: categoryState.uuid,
            name: categoryState.name,
            description: textContent,
            shortDescription: categoryState.shortDescription,
            seoObject: {
                htmlTagTitle: categoryState.seoObject.htmlTagTitle,
                htmlTagDescription: categoryState.seoObject.htmlTagDescription
            },
            sortOrder: categoryState.sortOrder,
            mainCategory: categoryState.mainCategory,
            showDescriptionInPage: categoryState.showDescriptionInPage,
            ...((!!categoryState.parentCategoryUUID && !categoryState.mainCategory) && {parentCategoryUUID: categoryState.parentCategoryUUID}),
            categoryPage: categoryState.categoryPage,
            image: categoryState.image,
        }
        // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!! --> "+JSON.stringify(category))
        var formData = new FormData;
        formData.append('image', image as Blob);
        formData.append('category', new Blob([JSON.stringify(category)], {type: 'application/json'}));
        try {
            const response = await saveCategoryAPI(formData, categorySaved.uuid);
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
            toast.error("toast.error(res.general);");
        }
    }

    const handleContentChange = (newContent: string) => {
        setTextContent(newContent);
    };

    useEffect(() => {
        setCategoryState({...categoryState, parentCategoryName: "", parentCategoryUUID: ""});
    }, [categoryState.categoryPage]);

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
                        <div className="d-flex flex-column align-items-start w-100 mb-4">
                            <label>Повний опис</label>
                            <TinyMCEEditor onContentChange={handleContentChange} initialValue={textContent}/>
                            {/*<TinyMCEEditor*/}
                            {/*    onContentChange={(text) => {*/}
                            {/*    setCategoryState({...categoryState, description: text})*/}
                            {/*    }}*/}
                            {/*    initialValue={categoryState.description}/>*/}
                        </div>
                        <div className="d-flex flex-column align-items-start w-100 mb-4">
                            <label>Міні опис</label>
                            <textarea className="w-100 h-auto" name="name"
                                      value={categoryState.shortDescription}
                                      onChange={(e) => {
                                          setCategoryState({...categoryState, shortDescription: e.target.value});
                                      }}
                            />
                        </div>
                        <div className="d-flex flex-column align-items-start w-100 mb-4">
                            <label>Текст попередження</label>
                            <textarea className="w-100 h-auto" name="name"
                                      value={categoryState.attentionText}
                                      onChange={(e) => {
                                          setCategoryState({...categoryState, attentionText: e.target.value})
                                      }}/>
                        </div>
                    </div>

                    <div className="col-md-3 col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3">
                        <div className="d-flex flex-column align-items-start w-100">
                            <label>Ім`я</label>
                            <input type="text" className="w-100" name="name"
                                   value={categoryState.name}
                                   onChange={(e) => {
                                       setCategoryState({...categoryState, name: e.target.value});
                                   }}
                            />
                        </div>
                        {!!nameError && <p className="p_error ms-3">{nameError}</p>}

                        <div className="col-12 d-flex flex-column align-items-start gap-2 counter-box">
                            <div className="d-flex flex-column align-items-start w-100">
                                <label>Html tag «Title»</label>
                                <textarea className="w-100" name="name"
                                          value={categoryState.seoObject?.htmlTagTitle ?? ""}
                                          onChange={(e) => {
                                              const seo = categoryState.seoObject;
                                              seo.htmlTagTitle = e.target.value;
                                              setCategoryState({...categoryState, seoObject: seo})
                                          }}
                                          maxLength={200}

                                />
                                <span className="counter-text text-end">
                                     <span>{categoryState.seoObject?.htmlTagTitle.length ?? 0}</span>
                                        /
                                    <span>200</span>
                            </span>
                            </div>
                        </div>
                        {!!titleError && <p className="p_error ms-3">{titleError}</p>}

                        <div className="col-12 d-flex flex-column align-items-start gap-2 counter-box">
                            <div className="d-flex flex-column align-items-start w-100">
                                <label>Html tag «Description»</label>
                                <textarea className="w-100" name="name"
                                          value={categoryState.seoObject?.htmlTagDescription ?? ""}
                                          onChange={(e) => {
                                              const seo = categoryState.seoObject;
                                              seo.htmlTagDescription = e.target.value;
                                              setCategoryState({...categoryState, seoObject: seo});

                                          }}
                                          maxLength={360}
                                />
                                <span className="counter-text text-end">
                                     <span>{categoryState.seoObject?.htmlTagDescription.length ?? 0}</span>
                                        /
                                    <span>360</span>
                            </span>
                            </div>
                        </div>
                        {!!descriptionError && <p className="p_error ms-3">{descriptionError}</p>}

                        <div className="d-flex flex-row w-100 align-items-center">
                            <span className="me-auto">Головна категорія: </span>
                            <input id="toggleSwitchCategory" type="checkbox" className="toggle-switch" name="mainCategory"
                                   checked={categoryState.mainCategory}
                                   onChange={(e) => {
                                       setCategoryState({...categoryState, mainCategory: e.target.checked})
                                   }}
                            />
                            <label htmlFor="toggleSwitchCategory" className="toggle-switch-label"></label>

                        </div>

                        <div className="d-flex flex-row w-100 align-items-center">
                            <span className="me-auto">Опис на сторінці (так\ні):</span>
                            <input id="toggleSwitchDescr" type="checkbox" name="showDescriptionInPage"
                                   className="toggle-switch"
                                   checked={categoryState.showDescriptionInPage}
                                   onChange={(e) => {
                                       setCategoryState({...categoryState, showDescriptionInPage: e.target.checked});
                                   }}
                            />
                            <label htmlFor="toggleSwitchDescr" className="toggle-switch-label"></label>
                        </div>

                        <div className="d-flex flex-column w-100">
                            <div className="d-flex flex-column">
                                <label className="me-auto">Порядок сортування: </label>
                                <input type="number"
                                       value={categoryState.sortOrder}
                                       onChange={(e) => {
                                           setCategoryState({...categoryState, sortOrder: Number(e.target.value)})
                                       }}
                                       min={0}
                                       max={10000}
                                />
                            </div>
                        </div>
                        <div className="d-flex flex-column w-100 align-items-start">
                            <label htmlFor="page">Сторінка вивода</label>
                            <select id="page" name="categoryPage" className="w-100"
                                    value={categoryState.categoryPage ?? "noPage"}
                                    onChange={(e) => {
                                        setCategoryState({...categoryState, categoryPage: e.target.value})
                                    }}
                            >
                                <option value="NO_PAGE">Оберіть сторінку вивода</option>
                                <option value="DICTIONARY_PAGE">Словник</option>
                                <option value="MINI_STORIES">Міні історії</option>
                                <option value="LESSON_WORDS">Заняття для слів</option>
                                <option value="LESSON_PHRASES">Заняття для фпаз</option>
                            </select>
                        </div>
                        {!categoryState.mainCategory && categoryState.categoryPage && (
                            <SearchCategory
                                title={"Батьківська категорія"}
                                placeholder={"Знайти батьківську категорію..."}
                                categoryPage={categoryState.categoryPage}
                                categoryName={categoryState.parentCategoryName}
                                setCategoryName={(name) => {
                                    setCategoryState({...categoryState, parentCategoryName: name});
                                }}
                                setCategoryUUID={(uuid) => {
                                    const state = categoryState;
                                    state.parentCategoryUUID = uuid;
                                    setCategoryState(state);
                                }}
                            />
                            // <>
                            //     <label>Батьківська категорія:
                            //         {parentCategory &&
                            //             <span style={{paddingLeft: 10, color: "#307ed9"}}>{parentCategory.name}</span> ||
                            //             <span style={{paddingLeft: 10, color: "#307ed9"}}>Відсутня</span>
                            //         }
                            //     </label>
                            //     <select className="w-100" onChange={(e) => handleSelectMainCategory(e.target.value)}>
                            //         <option>Змінити батьківську категорію</option>
                            //         {/*{category.mainCategories && category.mainCategories.length > 0 &&*/}
                            //         {/*    category.mainCategories.map(category => (*/}
                            //         {/*        <option key={category.uuid} value={category.uuid}>*/}
                            //         {/*            {category.name}*/}
                            //         {/*        </option>*/}
                            //         {/*    ))*/}
                            //         {/*}*/}
                            //     </select>
                            //
                            //     <select className="w-100" onChange={(e) => handleSelectSubcategory(e.target.value)}>
                            //         <option>Змінити підкатегорію</option>
                            //         {subCategories && subCategories.length > 0 &&
                            //             subCategories.map(category => (
                            //                 <option key={category.uuid} value={category.uuid}>
                            //                     {category.name}
                            //                 </option>
                            //             ))}
                            //
                            //     </select>
                            // </>
                        )}


                        <div className="d-flex flex-column align-items-start w-100 pt-2">
                            <button type="button" className="w-100 d-flex flex-row br-g"
                                    onClick={() => setVisit(!visit)}>
                                <span className="align-items-start">Зображення категорії</span>
                                <ReactSVG src="/images/arrow-down.svg" className="color-arrow-svg ms-auto"
                                          beforeInjection={(svg) => {
                                              svg.setAttribute('style', 'width: 15px')
                                              svg.setAttribute('style', 'height: 15px')
                                          }}/>
                            </button>
                            <div className={visit ? "block-h mt-2 visit" : "block-h"}>
                                <Storages
                                    title={"Директорія для зображення"}
                                    setStorageId={(storageId) => {
                                        categoryState.image.storageId = storageId;
                                        setCategoryState({...categoryState});
                                    }}
                                    storageId={categoryState.image?.storageId ?? null}
                                />
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
                </form>
            </div>
        </>
    );
};