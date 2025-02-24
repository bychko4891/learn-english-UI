'use client'

import {ButtonBack} from "@/components/admin/ButtonBack";
import TinyMCEEditor from "@/app/TinyMCEEditor";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {ReactSVG} from "react-svg";
import {Category, ImageAPI, SEOObject} from "@/app/DefaultResponsesInterfaces";
import {saveCategory, SaveCategoryErrors} from "@/app/(protected)/admin/categories/category/[uuid]/saveCategory";
import Image from "next/image";
import {toast, ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../categories.style.css"
import {SearchCategory} from "@/app/(protected)/admin/categories/category/[uuid]/SearchCategory";
import {Storages} from "@/components/admin/Storages";
import {ShowErrorMessage} from "@/components/ShowErrorMessage";

export type CategoryState = {
    uuid: string;
    name: string;
    sortOrder: number;
    shortDescription: string;
    attentionText: string;
    mainCategory: boolean;
    inMenu: boolean;
    subCategoryInMenu: boolean;
    showDescriptionInPage: boolean;
    parentCategoryUUID: string;
    parentCategoryName: string;
    categoryPage: string;
    image: ImageAPI;
    seoObject: SEOObject;
}

export const CategoryForm = ({category}: { category: Category }) => {

    // console.log(JSON.stringify(category))

    const imgUrl = category.image ? `/api/i/${category.image.storageId}/image/${category.image.imageName}` : "";
    const [categorySaved, setCategorySaved] = useState<Category>(category);
    const [description, setDescription] = useState<string>(categorySaved.description);
    const [categoryState, setCategoryState] = useState<CategoryState>({
        uuid: categorySaved.uuid,
        name: categorySaved.name,
        sortOrder: categorySaved.sortOrder,
        shortDescription: categorySaved.shortDescription,
        attentionText: categorySaved.attentionText,
        mainCategory: categorySaved.mainCategory,
        inMenu: categorySaved.inMenu,
        subCategoryInMenu: categorySaved.subCategoryInMenu,
        showDescriptionInPage: categorySaved.showDescriptionInPage,
        parentCategoryUUID: categorySaved.parentCategory?.uuid ? categorySaved.parentCategory?.uuid : "",
        parentCategoryName: categorySaved.parentCategory?.name ? categorySaved.parentCategory?.name : "",
        categoryPage: categorySaved.categoryPage,
        image: categorySaved.image ? categorySaved.image : {width: "", height: "", storageId: null} as ImageAPI,
        seoObject: {
            h1: categorySaved.seoObject?.h1 ?? "",
            htmlTagTitle: categorySaved.seoObject?.htmlTagDescription ?? "",
            htmlTagDescription: categorySaved.seoObject?.htmlTagDescription ?? "",
        } as SEOObject,
    });

    const [image, setImage] = useState<File>();
    const [imageURL, setImageURL] = useState<string>(imgUrl);
    const [visit, setVisit] = useState(false);

    const [errors, setErrors] = useState<SaveCategoryErrors | undefined>();


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
        setErrors(undefined);
        // setDisabled(true);

        const category = {
            uuid: categoryState.uuid,
            name: categoryState.name,
            description: description,
            shortDescription: categoryState.shortDescription,
            seoObject: {
                htmlTagTitle: categoryState.seoObject.htmlTagTitle,
                htmlTagDescription: categoryState.seoObject.htmlTagDescription
            },
            sortOrder: categoryState.sortOrder,
            mainCategory: categoryState.mainCategory,
            inMenu: categoryState.inMenu,
            subCategoryInMenu: categoryState.subCategoryInMenu,
            showDescriptionInPage: categoryState.showDescriptionInPage,
            ...((!!categoryState.parentCategoryUUID && !categoryState.mainCategory) && {parentCategoryUUID: categoryState.parentCategoryUUID}),
            categoryPage: categoryState.categoryPage,
            image: categoryState.image,
        }

        var formData = new FormData;
        if(image) formData.append('image', image as Blob);
        formData.append('category', new Blob([JSON.stringify(category)], {type: 'application/json'}));

         const res = await saveCategory(formData, categorySaved.uuid);
         if(res.ok) {
             toast.success(res.ok.localizedMessage);
             setCategorySaved(res.ok.t);
             return;
         }
         setErrors(res.err ? res.err : undefined);
         toast.error("Є помилки при введенні даних!");
         if(res.err?.error)toast.error(res.err?.error);
    }

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
                            <TinyMCEEditor onContentChange={setDescription} initialValue={description}/>
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
                        {errors?.name && <ShowErrorMessage error={errors?.name} />}

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
                        {errors?.seoObject?.htmlTagTitle && <ShowErrorMessage error={errors.seoObject.htmlTagTitle} />}

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
                        {errors?.seoObject?.htmlTagDescription && <ShowErrorMessage error={errors.seoObject.htmlTagDescription} />}

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
                            <span className="me-auto">Показувати в меню: </span>
                            <input id="inMenu" type="checkbox" className="toggle-switch" name="inMenu"
                                   checked={categoryState.inMenu}
                                   onChange={(e) => {
                                       setCategoryState({...categoryState, inMenu: e.target.checked})
                                   }}
                            />
                            <label htmlFor="inMenu" className="toggle-switch-label"></label>
                        </div>
                        <div className="d-flex flex-row w-100 align-items-center">
                            <span className="me-auto">Показувати підкатегорії в меню: </span>
                            <input id="subCategoryInMenu" type="checkbox" className="toggle-switch" name="subCategoryInMenu"
                                   checked={categoryState.subCategoryInMenu}
                                   onChange={(e) => {
                                       setCategoryState({...categoryState, subCategoryInMenu: e.target.checked})
                                   }}
                            />
                            <label htmlFor="subCategoryInMenu" className="toggle-switch-label"></label>
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
                                <option value="LESSON_PHRASES">Заняття для фраз</option>
                                <option value="ARTICLES">Статті</option>
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