'use client'

import {ButtonBack} from "@/components/admin/ButtonBack";
import TinyMCEEditor from "@/app/TinyMCEEditor";
import {useState} from "react";

export const CategoryForm = () => {


    const [textContent, setTextContent] = useState<string>("");

    const handleContentChange = (newContent: string) => {
        setTextContent(newContent);
    };

    return (
        <>
            <div className="d-flex justify-content-between top-admin-block">
                <ButtonBack backURL="/admin/categories" />
                <div className="center">
                    <h1>Редагування категорії</h1>
                </div>
                {/*<ButtonNewCategory/>*/}
                <button type="button" className="right">Save</button>
            </div>
            <div className="category-tree d-flex flex-column">
                <TinyMCEEditor onContentChange={handleContentChange} initialValue={textContent}/>
            </div>
        </>
    )
        ;
};