'use client'

import {ButtonBack} from "@/components/admin/ButtonBack";
import React, {FormEvent, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {ReactSVG} from "react-svg";
import {Audio, Word} from "@/app/DefaultResponsesInterfaces";
import {saveAppPageContentAPI} from "@/app/(protected)/admin/app-pages/contents/[uuid]/saveAppPageContentAPI";
import {toast, ToastContainer, Zoom} from "react-toastify";

export const WordForm = ({wordResp}: { wordResp: Word }) => {


    const [name, setName] = useState(wordResp.name);
    const [translate, setTranslate] = useState(wordResp.translate);
    const [brTranscription, setBrTranscription] = useState(wordResp.brTranscription);
    const [usaTranscription, setUsaTranscription] = useState(wordResp.usaTranscription);
    const [irregularVerbPt, setIrregularVerbPt] = useState(wordResp.irregularVerbPt);
    const [irregularVerbPp, setIrregularVerbPp] = useState(wordResp.irregularVerbPp);
    const [activeURL, setActiveURL] = useState(wordResp.activeURL);
    const [audio, setAudio] = useState<Audio>(wordResp.audio);
    const [uuid, setUuid] = useState(wordResp.uuid);

    const [nameError, setNameError] = useState<string>();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // setDisabled(true);
        const word = {
            uuid: uuid,
            name: name,
            translate: translate,
            brTranscription: brTranscription,
            usaTranscription: usaTranscription,
            irregularVerbPt: irregularVerbPt,
            irregularVerbPp: irregularVerbPp,
            activeURL: activeURL
        } as Word;
        var formData = new FormData;
        // formData.append('image', image as Blob);
        formData.append('pageContent', new Blob([JSON.stringify(word)], {type: 'application/json'}));
        try {
            const response = await saveAppPageContentAPI(formData, uuid);
            if (response?.status === 200) {
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
                            <label>Слово</label>
                            <input type="text" className="w-50" name="name" value={name}
                                   onChange={(e) => setName(e.target.value)}/>
                        </div>
                    </div>
                    {!!nameError && <p className="p_error ms-3">{nameError}</p>}
                    <div className="col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3 counter-box">
                        <div className="d-flex flex-column align-items-start w-100">
                            <label>Html tag «Title»</label>
                            <textarea className="w-50" name="translate" value={translate}
                                      onChange={(e) => setTranslate(e.target.value)}/>
                        </div>
                    </div>

                    <div className="col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3 counter-box">
                        <div className="d-flex flex-column align-items-start w-100">
                            <label>Html tag «Description»</label>
                            <input className="w-50" name="brTranscription" value={brTranscription}
                                   onChange={(e) => setBrTranscription(e.target.value)}/>
                        </div>
                    </div>

                    <div className="col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3">
                        <div className="d-flex flex-column align-items-start w-100">
                            <label>URL сторінки</label>
                            <input type="text" className="w-50" name="usaTranscription" value={usaTranscription}
                                   onChange={(e) => setUsaTranscription(e.target.value)} required={true}/>
                        </div>
                    </div>

                    <div className="col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3">
                        <div className="d-flex flex-column align-items-start w-100">
                            <label>URL сторінки</label>
                            <input type="text" className="w-50" name="usaTranscription" value={irregularVerbPt}
                                   onChange={(e) => setIrregularVerbPt(e.target.value)} required={true}/>
                        </div>
                    </div>

                    <div className="col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3">
                        <div className="d-flex flex-column align-items-start w-100">
                            <label>URL сторінки</label>
                            <input type="text" className="w-50" name="irregularVerbPp" value={irregularVerbPp}
                                   onChange={(e) => setIrregularVerbPp(e.target.value)} required={true}/>
                        </div>
                    </div>

                    <div className="d-flex flex-row w-100 align-items-center">
                        <span className="me-auto">Головна категорія: </span>
                        <input id="toggleSwitch" type="checkbox" checked={activeURL} className="toggle-switch" name="activeURL"
                               onChange={(e) => setActiveURL(e.target.checked)}/>
                        <label htmlFor="toggleSwitch" className="toggle-switch-label"></label>
                    </div>

                    <input type="hidden" name="uuid" value={uuid} onChange={(e) => setUuid(e.target.value)}/>
                </form>
            </div>
        </>
    );
};