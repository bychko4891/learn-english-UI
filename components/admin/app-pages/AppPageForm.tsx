'use client'

import {AppPage} from "@/app/DefaultResponsesInterfaces";
import React, {FormEvent, useState} from "react";
import {toast, ToastContainer, Zoom} from "react-toastify";
import {ButtonBack} from "@/components/admin/ButtonBack";
import {ReactSVG} from "react-svg";
import {saveAppPageAPI} from "@/app/(protected)/admin/app-pages/[uuid]/saveAppPageAPI";
import 'react-toastify/dist/ReactToastify.css';

export const AppPageForm = ({appPage}: { appPage: AppPage }) => {

    const [uuid, setUuid] = useState(appPage.uuid);
    const [h1, setH1] = useState(appPage.h1);
    const [title, setTitle] = useState(appPage.htmlTagTitle || "");
    const [description, setDescription] = useState(appPage.htmlTagDescription || "");
    const [url, setUrl] = useState(appPage.url);

    const [h1Error, setH1Error] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [titleError, setTitleError] = useState("");
    const [urlError, setUrlError] = useState("");
    const [generalError, setGeneralError] = useState("");



    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // setDisabled(true);
        const page = {
            uuid: uuid,
            h1: h1,
            htmlTagTitle: title,
            htmlTagDescription: description,
            url: url
        } as AppPage;

        try {
            const response = await saveAppPageAPI(page, uuid);
            if (response?.status === 200) {
                toast.success(response.general);
            }
            if (response?.status === 400) {
                setDescriptionError(response?.htmlTagDescription)
                setTitleError(response?.htmlTagTitle)
                setUrlError(response?.url)
                setGeneralError(response?.general)
                setH1Error(response?.h1)
                toast.error("Є помилки при введенні даних!");
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
                <ButtonBack backURL="/admin/app-pages"/>
                <div className="center">
                    <h1>Редагування сторінки</h1>
                </div>
                <button form="form" type="submit" className="right save">
                    <ReactSVG src="/images/save.svg" className="back-arrow-color" beforeInjection={(svg) => {
                        svg.setAttribute('style', 'width: 35px')
                        svg.setAttribute('style', 'height: 35px')
                    }}/>
                </button>
            </div>
            <div className="block-form">
                <form id="form" className="d-flex flex-column mt-3 gap-3" onSubmit={handleSubmit}>
                    <div className="col-12 d-flex flex-column align-items-start ms-3 gap-3 pe-4">
                        <div className="d-flex flex-column align-items-start w-100">
                            <label>H1 сторінки</label>
                            <input type="text" className="w-50" name="name" value={h1}
                                   onChange={(e) => setH1(e.target.value)}/>
                        </div>
                    </div>
                    {!!h1Error && <p className="p_error ms-3">{h1Error}</p>}
                    <div className="col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3 counter-box">
                        <div className="d-flex flex-column align-items-start w-100">
                            <label>Html tag «Title»</label>
                            <textarea className="w-50" name="name" value={title}
                                      onChange={(e) => setTitle(e.target.value)}/>
                            <span className="counter-text w-50 text-end pe-3">
                                     <span>{title.length}</span>
                                        /
                                    <span>360</span>
                            </span>
                        </div>
                    </div>
                    {!!titleError && <p className="p_error ms-3">{titleError}</p>}

                    <div className="col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3 counter-box">
                        <div className="d-flex flex-column align-items-start w-100">
                            <label>Html tag «Description»</label>
                            <textarea className="w-50" name="name" value={description}
                                      onChange={(e) => setDescription(e.target.value)}/>
                            <span className="counter-text w-50 text-end pe-3">
                                     <span>{description.length}</span>
                                        /
                                    <span>360</span>
                            </span>
                        </div>
                    </div>
                    {!!descriptionError && <p className="p_error ms-3">{descriptionError}</p>}

                    <div className="col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3">
                        <div className="d-flex flex-column align-items-start w-100">
                            <label>URL сторінки</label>
                            <input type="text" className="w-50" name="name" value={url}
                                   onChange={(e) => setUrl(e.target.value)} required={true}/>
                        </div>
                    </div>
                    {!!urlError && <p className="p_error ms-3">{urlError}</p>}
                    {!!generalError && <p className="p_error ms-3">{generalError}</p>}

                    <input type="hidden" name="uuid" value={uuid} onChange={(e) => setUuid(e.target.value)}/>
                </form>
            </div>
        </>
    );


};