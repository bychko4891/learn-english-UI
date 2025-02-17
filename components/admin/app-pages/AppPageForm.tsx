'use client'

import React, {FormEvent, useState} from "react";
import {toast, ToastContainer, Zoom} from "react-toastify";
import {ButtonBack} from "@/components/admin/ButtonBack";
import {ReactSVG} from "react-svg";
import {saveAppPage, SaveAppPageErrors} from "@/app/(protected)/admin/app-pages/[uuid]/saveAppPage";
import 'react-toastify/dist/ReactToastify.css';
import {AppPage} from "@/app/(protected)/admin/app-pages/[uuid]/getAppPage";
import {SEOObject} from "@/app/DefaultResponsesInterfaces";
import {ShowErrorMessage} from "@/components/ShowErrorMessage";

export const AppPageForm = ( props:{ appPage: AppPage } ) => {

    const [appPageSaved, setAppPageSaved] = useState(props.appPage);
    const [appPageState, setAppPageState] = useState({
        uuid: appPageSaved.uuid,
        url: appPageSaved.url,
        seoObject: {
            h1: appPageSaved.seoObject?.h1 ?? "",
            htmlTagTitle: appPageSaved.seoObject?.htmlTagTitle ?? "",
            htmlTagDescription: appPageSaved.seoObject?.htmlTagDescription ?? "",
        } as SEOObject,
    });

    const [errors, setErrors] = useState<SaveAppPageErrors | undefined>();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // setDisabled(true);
        const page: Record<string, any> = {
            uuid: appPageSaved.uuid,
            url: appPageState.url,
            seoObject: {
                h1: appPageState.seoObject.h1,
                htmlTagTitle: appPageState.seoObject.htmlTagTitle,
                htmlTagDescription: appPageState.seoObject.htmlTagDescription ?? "",
            },
        };
        const res = await saveAppPage(page, appPageSaved.uuid);
        if (res.ok) {
            setAppPageSaved(res.ok.t);
            toast.success(res.ok.localizedMessage);
            return;
        }
        setErrors(res.err ? res.err : undefined)
        toast.error("Є помилки при введенні даних!");
        toast.error(res.err?.error);
    }

    console.log(JSON.stringify(appPageState))
    console.log(JSON.stringify("SAVED --> "+JSON.stringify(appPageSaved)))

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
                            <input type="text" className="w-50" name="name"
                                   value={appPageState.seoObject.h1}
                                   onChange={(e) => {
                                       const seo = appPageState.seoObject;
                                       seo.h1 = e.target.value;
                                       setAppPageState({...appPageState, seoObject: seo});
                                   }}
                            />
                        </div>
                    </div>
                    {errors?.seoObject?.h1 && <ShowErrorMessage error={errors?.seoObject?.h1} />}

                    <div className="col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3 counter-box">
                        <div className="d-flex flex-column align-items-start w-100">
                            <label>Html tag «Title»</label>
                            <textarea className="w-50" name="name"
                                      value={appPageState.seoObject.htmlTagTitle}
                                      onChange={(e) => {
                                          const seo = appPageState.seoObject;
                                          seo.htmlTagTitle = e.target.value;
                                          setAppPageState({...appPageState, seoObject: seo});
                                      }}
                            />
                            <span className="counter-text w-50 text-end pe-3">
                                     <span>{appPageState.seoObject.htmlTagTitle.length}</span>
                                        /
                                    <span>360</span>
                            </span>
                        </div>
                    </div>
                    {errors?.seoObject?.htmlTagTitle && <ShowErrorMessage error={errors?.seoObject?.htmlTagTitle} />}

                    <div className="col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3 counter-box">
                        <div className="d-flex flex-column align-items-start w-100">
                            <label>Html tag «Description»</label>
                            <textarea className="w-50" name="name"
                                      value={appPageState.seoObject.htmlTagDescription}
                                      onChange={(e) => {
                                          const seo = appPageState.seoObject;
                                          seo.htmlTagDescription = e.target.value;
                                          setAppPageState({...appPageState, seoObject: seo});
                                      }}
                            />
                            <span className="counter-text w-50 text-end pe-3">
                                     <span>{appPageState.seoObject.htmlTagDescription.length}</span>
                                        /
                                    <span>360</span>
                            </span>
                        </div>
                    </div>
                    {errors?.seoObject?.htmlTagDescription && <ShowErrorMessage error={errors?.seoObject?.htmlTagDescription} />}

                    <div className="col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3">
                        <div className="d-flex flex-column align-items-start w-100">
                            <label>URL сторінки</label>
                            <input type="text" className="w-50" name="name"
                                   value={appPageState.url}
                                   onChange={(e) => setAppPageState({...appPageState, url: e.target.value})}
                                   required={true}
                            />
                        </div>
                    </div>
                    {errors?.url && <ShowErrorMessage error={errors?.url } />}
                    {errors?.error && <ShowErrorMessage error={errors?.error } />}
                </form>
            </div>
        </>
    )
}