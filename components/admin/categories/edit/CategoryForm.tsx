'use client'

import {ButtonBack} from "@/components/admin/ButtonBack";
import TinyMCEEditor from "@/app/TinyMCEEditor";
import {ChangeEvent, FormEvent, useState} from "react";
import "../categories.style.css"
import {ReactSVG} from "react-svg";
import {sendFormLoginAPI} from "@/app/login/sendFormLoginAPI";
import {Category, CategoryRequest} from "@/app/DefaultResponsesInterfaces";
import {saveCategoryAPI} from "@/app/(protected)/admin/categories/category/[uuid]/saveCategoryAPI";

export const CategoryForm = ({categoryRequest}: { categoryRequest: CategoryRequest }) => {

    const [textContent, setTextContent] = useState<string>(categoryRequest.category.description);
    const [mainCategory, setMainCategory] = useState(categoryRequest.category.mainCategory);
    const [showDescription, setShowDescription] = useState(true);
    const [selectedPage, setSelectedPage] = useState("NO_PAGE");
    const [name, setName] = useState(categoryRequest.category.name);
    const [uuid, setUuid] = useState(categoryRequest.category.uuid);
    const [image, setImage] = useState<File>();

    const [imageURL, setImageURL] = useState<string>('');
    const [visit, setVisit] = useState(false);

    const blockVisit = visit ? "block-h visit" : "block-h";

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


    const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedPage(e.target.value); // Оновлюємо стан із значенням, обраним користувачем
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // setDisabled(true);
        const category = {
            uuid: uuid,
            name: name,
            description: textContent,
            mainCategory: mainCategory,
            categoryPage: [selectedPage],
        } as Category
        var formData = new FormData;
        formData.append('image', image as Blob);
        formData.append('category', new Blob([JSON.stringify(category)], {type: 'application/json'}));
        try {
            const response = await saveCategoryAPI(formData, uuid);
            // setDisabled(false);
            // if(response) {
            //     // setRespData(response);
            // }
        } catch (error) {
            // setDisabled(false);
            // console.log("Server error: " + error)

        }
    }

    return (
        <>
            <div className="d-flex justify-content-between top-admin-block">
                <ButtonBack backURL="/admin/categories"/>
                <div className="center">
                    <h1>Редагування категорії</h1>
                </div>
                {/*<ButtonNewCategory/>*/}
                <button form="form" type="submit" className="right">Save</button>
            </div>
            <div className="category-tree">
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
                        <select className="w-100">
                            <option>Батьківська категорія</option>
                            {categoryRequest.mainCategories && categoryRequest.mainCategories.length > 0 &&
                                categoryRequest.mainCategories.map(category => (
                                    <option key={category.uuid} value={category.uuid}>
                                        {category.name}
                                    </option>
                                ))}
                        </select>

                        <select className="w-100">
                            <option>Оберіть підкатегорію</option>
                        </select>

                        <div className="d-flex flex-column w-100 align-items-start">
                            <label htmlFor="page">Сторінка вивода</label>
                            <select id="page" name="categoryPage" className="w-100" onChange={(e) => setSelectedPage(e.target.value)}>
                                <option value="NO_PAGE">Оберіть сторінку вивода</option>
                                <option value="VOCABULARY_PAGE">Словник</option>
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
                                        <img src={imageURL} alt="Uploaded Image" className="category-edit-img"/>}
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