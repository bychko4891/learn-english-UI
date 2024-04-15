'use client'

import {ButtonBack} from "@/components/admin/ButtonBack";
import React, {ChangeEvent, FormEvent, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {ReactSVG} from "react-svg";
import {Audio, Word} from "@/app/DefaultResponsesInterfaces";
import {toast, ToastContainer, Zoom} from "react-toastify";
import {AudiPlayerMini} from "@/components/audioPlayers/AudiPlayerMini";
import {saveWordAPI} from "@/app/(protected)/admin/words/word/[uuid]/saveWordAPI";

export const WordForm = ({wordResp}: { wordResp: Word }) => {

    const [name, setName] = useState(wordResp.name);
    const [translate, setTranslate] = useState(wordResp.translate);
    const [brTranscription, setBrTranscription] = useState(wordResp.brTranscription ? wordResp.brTranscription : "");
    const [usaTranscription, setUsaTranscription] = useState(wordResp.usaTranscription ? wordResp.usaTranscription : "");
    const [irregularVerbPt, setIrregularVerbPt] = useState(wordResp.irregularVerbPt ? wordResp.irregularVerbPt : "");
    const [irregularVerbPp, setIrregularVerbPp] = useState(wordResp.irregularVerbPp ? wordResp.irregularVerbPp : "");
    const [activeURL, setActiveURL] = useState(wordResp.activeURL);
    const [audio, setAudio] = useState<Audio>(wordResp.audio);
    const [uuid, setUuid] = useState(wordResp.uuid);

    const [nameError, setNameError] = useState<string>();

    const [brAudioFile, setBrAudioFile] = useState<File>();

    const [brAudioFileURL, setBrAudioFileURL] = useState<string | undefined>(
        wordResp.audio && wordResp.audio.brAudioName ? `/api/audio/${wordResp.audio.brAudioName}` : undefined
    );

    const [usaAudioFile, setUsaAudioFile] = useState<File>();
    const [usaAudioFileURL, setUsaAudioFileURL] = useState<string>();

    const [brSource, setBrSource] = useState<string>();


    const handleBrAudioChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setBrAudioFile(file);
        const reader = new FileReader();

        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                setBrAudioFileURL(reader.result);
            }
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };
    const handleUsaAudioChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setUsaAudioFile(file);
        const reader = new FileReader();

        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                setUsaAudioFileURL(reader.result);
            }
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };


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
        formData.append('br', brAudioFile as Blob);
        formData.append('usa', usaAudioFile as Blob);
        formData.append('word', new Blob([JSON.stringify(word)], {type: 'application/json'}));
        try {
            const response = await saveWordAPI(formData, uuid);
            // if (response?.status === 200) {
            //     toast.success(response.general);
            // }
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
                <ButtonBack backURL="/admin/words"/>
                <div className="center">
                    <h1>Редагування слова для словника</h1>
                </div>
                <button form="form" type="submit" className="right save">
                    <ReactSVG src="/images/save.svg" className="back-arrow-color" beforeInjection={(svg) => {
                        svg.setAttribute('style', 'width: 35px')
                        svg.setAttribute('style', 'height: 35px')
                    }}/>
                </button>
            </div>
            <div className="block-form word__form">
                <form id="form" className="d-flex flex-row mt-3 gap-3" onSubmit={handleSubmit}>
                    <div className="col-md-6 col-12">
                        <div className="col-12 d-flex flex-column align-items-start ms-3 gap-3 pe-4">
                            <div className="d-flex flex-column align-items-start w-100">
                                <label>Слово</label>
                                <input type="text" className="w-100" name="name" value={name}
                                       onChange={(e) => setName(e.target.value)} required={true}/>
                            </div>
                        </div>
                        {!!nameError && <p className="p_error ms-3">{nameError}</p>}
                        <div className="col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3 counter-box">
                            <div className="d-flex flex-column align-items-start w-100">
                                <label>Перреклад</label>
                                <textarea className="w-100" name="translate" value={translate}
                                          onChange={(e) => setTranslate(e.target.value)}/>
                            </div>
                        </div>

                        <div className="col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3 counter-box">
                            <div className="d-flex flex-column align-items-start w-100">
                                <label>Британська транскрипція</label>
                                <input className="w-100" name="brTranscription" value={brTranscription}
                                       onChange={(e) => setBrTranscription(e.target.value)}/>
                            </div>
                        </div>

                        <div className="col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3">
                            <div className="d-flex flex-column align-items-start w-100">
                                <label>Американська транскрипція</label>
                                <input type="text" className="w-100" name="usaTranscription" value={usaTranscription}
                                       onChange={(e) => setUsaTranscription(e.target.value)} />
                            </div>
                        </div>

                        <div className="col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3">
                            <div className="d-flex flex-column align-items-start w-100">
                                <label>URL сторінки</label>
                                <input type="text" className="w-100" name="usaTranscription" value={irregularVerbPt}
                                       onChange={(e) => setIrregularVerbPt(e.target.value)} />
                            </div>
                        </div>

                        <div className="col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3">
                            <div className="d-flex flex-column align-items-start w-100">
                                <label>URL сторінки</label>
                                <input type="text" className="w-100" name="irregularVerbPp" value={irregularVerbPp}
                                       onChange={(e) => setIrregularVerbPp(e.target.value)} />
                            </div>
                        </div>


                    </div>
                    <div className="col-md-6 col-12">
                        <div className="d-flex flex-row w-100 align-items-center">
                            <span>URL слова (активне / не активне): </span>
                            <input id="toggleSwitch" type="checkbox" checked={activeURL} className="toggle-switch"
                                   name="activeURL"
                                   onChange={(e) => setActiveURL(e.target.checked)}/>
                            <label htmlFor="toggleSwitch" className="toggle-switch-label"></label>
                        </div>

                        <div className="d-flex flex-column gap-4">

                            <div className="d-flex flex-column align-items-start gap-2">
                                <label>Британське аудіо</label>
                                <div className="d-flex flex-column w-100">
                                    <input type="file" accept=".mp3" onChange={handleBrAudioChange}/>
                                </div>
                                {brAudioFileURL &&
                                    <AudiPlayerMini audioSource={brAudioFileURL} blockName="Бр. аудіо"/>}
                            </div>

                            <div className="d-flex flex-column align-items-start gap-2">
                                <label>Американське аудіо</label>
                                <div className="d-flex flex-column w-100">
                                    <input type="file" accept=".mp3" onChange={handleUsaAudioChange}/>
                                </div>
                                {usaAudioFileURL &&
                                    <AudiPlayerMini audioSource={usaAudioFileURL} blockName="Амер. аудіо"/>}
                            </div>

                        </div>

                    </div>


                    <input type="hidden" name="uuid" value={uuid} onChange={(e) => setUuid(e.target.value)}/>
                </form>
            </div>
        </>
    );
};