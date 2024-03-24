'use client'

import {ButtonBack} from "@/components/admin/categories/ButtonBack";
import {ButtonNewCategory} from "@/components/admin/categories/ButtonNewCategory";
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
                <ButtonBack/>
                <div className="center">
                    <h1>Редагування категорії</h1>
                </div>
                <ButtonNewCategory/>
            </div>
            <div className="category-tree d-flex flex-column">
                <TinyMCEEditor onContentChange={handleContentChange} initialValue={textContent} />
            </div>
        </>
    )
        ;
};