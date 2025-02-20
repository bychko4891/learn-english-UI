'use client'

import {ButtonBack} from "@/components/admin/ButtonBack";
import TinyMCEEditor from "@/app/TinyMCEEditor";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {ReactSVG} from "react-svg";
import {toast, ToastContainer, Zoom} from "react-toastify";
import {AppPageContent} from "@/app/(protected)/admin/app-pages/contents/[uuid]/getAppPageContent";
import {SelectPage} from "@/app/(protected)/admin/app-pages/contents/[uuid]/SelectPage";
import {saveAppPageContent} from "@/app/(protected)/admin/app-pages/contents/[uuid]/saveAppPageContent";
import {SaveAppPageErrors} from "@/app/(protected)/admin/app-pages/[uuid]/saveAppPage";
import {Storages} from "@/components/admin/Storages";
import Image from "next/image";
import {ImageAPI} from "@/app/DefaultResponsesInterfaces";

export const AppPageContentForm = (props: { pageContent: AppPageContent }) => {


    const [pageContentSaved, setPageContentSaved] = useState<AppPageContent>(props.pageContent);
    const imgUrl = pageContentSaved.image ? `/api/i/${pageContentSaved.image.storageId}/image/${pageContentSaved.image.imageName}` : "";
    const [imageURL, setImageURL] = useState<string>(imgUrl);
    const [image, setImage] = useState<File>();
    const [description, setDescription] = useState<string>(pageContentSaved.description);
    const [pageContentState, setPageContentState] = useState({
        name: pageContentSaved.name,
        sortOrder: pageContentSaved.sortOrder,
        applicationPage: {
           appPageUUID: pageContentSaved.applicationPage?.uuid ?? "",
           appPageUrl: pageContentSaved.applicationPage?.url ?? "",

        },
        position: pageContentSaved.position ?? "",
        image: pageContentSaved.image ? pageContentSaved.image : {width: "", height: "", storageId: null} as ImageAPI,

    });
    const [errors, setErrors] = useState<SaveAppPageErrors | undefined>();
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
        const content: Record<string, any> = {
            uuid: pageContentSaved.uuid,
            name: pageContentState.name,
            description: description,
            sortOrder: pageContentState.sortOrder,
            applicationPageUUID: pageContentState.applicationPage.appPageUUID,
            position: pageContentState.position,
            image: pageContentState.image,
        };

        var formData = new FormData;
        formData.append('image', image as Blob);
        formData.append('content', new Blob([JSON.stringify(content)], {type: 'application/json'}));

        const res = await saveAppPageContent(formData, pageContentSaved.uuid);
        if (res.ok) {
            setPageContentSaved(res.ok.t);
            toast.success(res.ok.localizedMessage);
            return;
        }
        setErrors(res.err ? res.err : undefined)
        toast.error("Є помилки при введенні даних!");
        toast.error(res.err?.error);
    }

    // console.log(JSON.stringify(pageContentState))
    console.log("SAVED -->> " +  JSON.stringify(pageContentSaved))
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
            <div className="block-form">
                <form id="form" className=" d-flex flex-row mt-3" onSubmit={handleSubmit}>

                    <div className="col-md-9 col-12">
                        <TinyMCEEditor onContentChange={setDescription} initialValue={description}/>
                    </div>

                    <div className="col-md-3 col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3">
                        <div className="d-flex flex-column align-items-start w-100">
                            <label>Ім`я*</label>
                            <input type="text" className="w-100" name="name"
                                   value={pageContentState.name}
                                   onChange={(e) => {
                                       setPageContentState({...pageContentState, name: e.target.value});
                                   }}/>
                        </div>
                        <div className="d-flex flex-column w-100">
                            <div className="d-flex flex-column">
                                <label className="me-auto">Порядок сортування: </label>
                                <input type="number"
                                       value={pageContentState.sortOrder}
                                       onChange={(e) => {
                                           setPageContentState({...pageContentState, sortOrder: Number(e.target.value)})
                                       }}
                                       min={0}
                                       max={10000}
                                />
                            </div>
                        </div>

                        <SelectPage pageUrl={pageContentState.applicationPage.appPageUrl}
                                    pageUUID={pageContentState.applicationPage.appPageUUID}
                                    setPageUrl={(url) => {
                                        const page = pageContentState.applicationPage;
                                        page.appPageUrl = url;
                                        setPageContentState({...pageContentState, applicationPage: page});
                                    }}
                                    setPageUUID={(uuid) => {
                                        const page = pageContentState.applicationPage;
                                        page.appPageUUID = uuid;
                                        setPageContentState({...pageContentState, applicationPage: page});
                                    }}
                        />
                        <label className="d-flex flex-column w-100 align-items-start">
                            <span className="text-xl font-bold">Позиція на сторінці*</span>
                            <select
                                className="w-100 rounded border border-[#D7D7D7] p-[10px] font-normal accent-transparent placeholder:text-[#D7D7D7] focus:border-[#00742F] focus:bg-[#EFFFF6] focus:outline-none focus:ring-transparent"
                                name="unit"
                                value={pageContentState.position}
                                onChange={(e) => setPageContentState({...pageContentState, position: e.target.value})}
                                required
                            >
                                <option></option>
                                <option value="TOP">Верх</option>
                                <option value="CENTER">Центер</option>
                                <option value="BOTTOM">Низ</option>
                            </select>
                        </label>
                        <div className="d-flex flex-column align-items-start w-100 pt-2">
                            <button type="button" className="w-100 d-flex flex-row br-g align-items-center p-2"
                                    onClick={() => setVisit(!visit)}>
                                <span className="align-items-start">Зображення*</span>
                                <ReactSVG src="/images/arrow-down.svg" className="color-arrow-svg ms-auto"
                                          beforeInjection={(svg) => {
                                              svg.setAttribute('style', visit ? '' : 'transform: rotate(90deg);')
                                          }}
                                />
                            </button>
                            <div className={visit ? "block-h mt-2 visit" : "block-h"}>
                                <Storages
                                    title={"Директорія для зображення"}
                                    setStorageId={(storageId) => {
                                        pageContentState.image.storageId = storageId;
                                        setPageContentState({...pageContentState});
                                    }}
                                    storageId={pageContentState.image?.storageId ?? null}
                                />
                                <input type="file" className="w-100" accept="image/*" onChange={handleImageChange}/>
                                <div className="category-edit-img-container">
                                    {imageURL &&
                                        <Image unoptimized src={imageURL} alt="Uploaded Image" width="450" height="280"
                                               className="block-edit-img"/>}
                                </div>
                                <div className="d-flex w-100">
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