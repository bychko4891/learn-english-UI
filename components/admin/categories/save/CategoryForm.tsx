'use client'

import {ButtonBack} from "@/components/admin/ButtonBack";
import TinyMCEEditor from "@/app/TinyMCEEditor";
import {ChangeEvent, useState} from "react";
import "../categories.style.css"

export const CategoryForm = () => {

    const [imageURL, setImageURL] = useState<string>('');

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
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


    const [textContent, setTextContent] = useState<string>("");

    const handleContentChange = (newContent: string) => {
        setTextContent(newContent);
    };

    return (
        <>
            <div className="d-flex justify-content-between top-admin-block">
                <ButtonBack backURL="/admin/categories"/>
                <div className="center">
                    <h1>Редагування категорії</h1>
                </div>
                {/*<ButtonNewCategory/>*/}
                <button type="button" className="right">Save</button>
            </div>
            <div className="category-tree">
                <form className=" d-flex flex-row mt-3">

                    <div className="col-md-9 col-12">
                        <TinyMCEEditor onContentChange={handleContentChange} initialValue={textContent}/>
                    </div>

                    <div className="col-md-3 col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3">
                        <div className="d-flex flex-column align-items-start w-100">
                            <label>Ім`я</label>
                            <input type="text" className="w-100"/>
                        </div>

                        <div className="d-flex flex-column align-items-start w-100">
                            <label>Батьківська категорія</label>
                            <span className="d-flex align-items-start w-100" style={{borderBottom: "1px solid"}}>Відсутня</span>
                        </div>

                        <label>Змінити категорію</label>
                        <select className="w-100">
                            <option>Оберіть категорію</option>
                        </select>

                        <select className="w-100">
                            <option>Оберіть підкатегорію</option>
                        </select>

                        <div className="d-flex flex-column align-items-start w-100">
                            <label>Зображення</label>
                            <input type="file" className="w-100" accept="image/*" onChange={handleImageChange}/>
                            <div className="category-edit-img-container">
                                {imageURL && <img src={imageURL} alt="Uploaded Image" className="category-edit-img" />}
                            </div>
                        </div>


                    </div>
                </form>
            </div>
        </>
    )
        ;
};