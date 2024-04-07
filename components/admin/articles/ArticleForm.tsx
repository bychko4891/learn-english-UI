'use client'

import {ButtonBack} from "@/components/admin/ButtonBack";
import TinyMCEEditor from "@/app/TinyMCEEditor";
import React, {ChangeEvent, FormEvent, useState} from "react";
import "../../categories/categories.style.css"
import 'react-toastify/dist/ReactToastify.css';
import {ReactSVG} from "react-svg";
import {AppPage, AppPageContent, AppPageContentRequest} from "@/app/DefaultResponsesInterfaces";
import {saveAppPageContentAPI} from "@/app/(protected)/admin/app-pages/contents/[uuid]/saveAppPageContentAPI";
import {toast, ToastContainer, Zoom} from "react-toastify";

export const ArticleForm = ({pageContent}: { pageContent: AppPageContentRequest }) => {

    const imgUrl = pageContent.applicationPageContent.image ? `/api/webimg/${pageContent.applicationPageContent.image.imageName}` : "";

    const [textContent, setTextContent] = useState<string>(pageContent.applicationPageContent.description);
    const [selectedPage, setPage] = useState<AppPage>(pageContent.applicationPageContent.applicationPage);
    const [selectedPositionContent, setPositionContent] = useState<string[]>(pageContent.applicationPageContent?.positionContent);
    const [name, setName] = useState(pageContent.applicationPageContent.name);
    const [uuid, setUuid] = useState(pageContent.applicationPageContent.uuid);
    const [image, setImage] = useState<File>();

    const [imageURL, setImageURL] = useState<string>(imgUrl);
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

    const handleSelectPage = (uuid: string) => {
        pageContent.applicationPages.forEach(appPage => {
            if (appPage.uuid === uuid) {
                setPage(appPage);
                return;
            }
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // setDisabled(true);
        const pageContent = {
            uuid: uuid,
            name: name,
            description: textContent,
            applicationPage: selectedPage,
            positionContent: selectedPositionContent
        } as AppPageContent;
        var formData = new FormData;
        formData.append('image', image as Blob);
        formData.append('pageContent', new Blob([JSON.stringify(pageContent)], {type: 'application/json'}));
        try {
            const response = await saveAppPageContentAPI(formData, uuid);
            if(response?.status ===200) {
                toast.success(response.general);
            }
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
            <ToastContainer autoClose={3000} transition={Zoom}/>
            <div className="d-flex justify-content-between top-admin-block">
                <ButtonBack backURL="/admin/app-pages/contents"/>
                <div className="center">
                    <h1>Редагування контента сторінки</h1>
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
                            <input type="text" className="w-100" name="name" value={name}
                                   onChange={(e) => setName(e.target.value)}/>
                        </div>

                           <label>Сторінка вивода:
                            {selectedPage &&
                                <span style={{paddingLeft: 10, color: "#307ed9"}}>{selectedPage.url}</span>
                            }
                        </label>

                        <select className="w-100" onChange={(e) => handleSelectPage(e.target.value)}>
                            <option>Змінити сторінку</option>
                            {pageContent.applicationPages && pageContent.applicationPages.length > 0 &&
                                pageContent.applicationPages.map(appPage => (
                                    <option key={appPage.uuid} value={appPage.uuid}>
                                        {appPage.url}
                                    </option>
                                ))}

                        </select>

                        <div className="d-flex flex-column w-100 align-items-start gap-2">
                            <label htmlFor="page">Позиція контента:
                                {selectedPositionContent && selectedPositionContent.length > 0 &&
                                    <span
                                        style={{paddingLeft: 10, color: "#307ed9"}}>{selectedPositionContent[0]}</span>
                                }</label>
                            <select id="page" name="categoryPage" className="w-100"
                                    onChange={(e) => setPositionContent([e.target.value])}>
                                <option>Змінити позицію контента</option>
                                <option value="TOP">Верх</option>
                                <option value="BOTTOM">Низ</option>
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