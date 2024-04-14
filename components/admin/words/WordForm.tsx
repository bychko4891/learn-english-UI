'use client'

import {ButtonBack} from "@/components/admin/ButtonBack";
import React, {FormEvent, useEffect, useRef, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {ReactSVG} from "react-svg";
import {Audio, Word} from "@/app/DefaultResponsesInterfaces";
import {saveAppPageContentAPI} from "@/app/(protected)/admin/app-pages/contents/[uuid]/saveAppPageContentAPI";
import {toast, ToastContainer, Zoom} from "react-toastify";
import Lottie, {LottieRefCurrentProps} from 'lottie-react';
import PlayPause from "@/public/images/play-pause.json"
import "./word.style.css";
import {AudiPlayerMini} from "@/components/AudiPlayerMini";

export const WordForm = ({wordResp}: { wordResp: Word }) => {

    const lottieRefUsaPlayer = React.useRef<LottieRefCurrentProps>(null)
    const lottieRefBrPlayer = React.useRef<LottieRefCurrentProps>(null)

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

    const [isUsaAudioPlaying, setIsUsaAudioPlaying] = useState(false);
    const [isBrAudioPlaying, setIsBrAudioPlaying] = useState(false);


    useEffect(() => {
        if (lottieRefBrPlayer && lottieRefBrPlayer.current) {
            // lottieRef.current.play();
            lottieRefBrPlayer.current.goToAndStop(14, true);
            if (isBrAudioPlaying) {
                lottieRefBrPlayer.current.playSegments([14, 27], true);
            } else {
                lottieRefBrPlayer.current.playSegments([0, 14], true);
            }
        }
    });

    useEffect(() => {
        if (lottieRefUsaPlayer && lottieRefUsaPlayer.current) {
            // lottieRef.current.play();
            lottieRefUsaPlayer.current.goToAndStop(14, true);
            if (isUsaAudioPlaying) {
                lottieRefUsaPlayer.current.playSegments([14, 27], true);
            } else {
                lottieRefUsaPlayer.current.playSegments([0, 14], true);
            }
        }
    });

    const handleTogglePlayBrPlayer = () => {
        setIsBrAudioPlaying(!isBrAudioPlaying);
    };

    const handleTogglePlayUsaPlayer = () => {
        setIsUsaAudioPlaying(!isUsaAudioPlaying);
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
                    <h1>Редагування слова для словника</h1>
                </div>
                <button form="form" type="submit" className="right save">
                    <ReactSVG src="/images/save.svg" className="back-arrow-color" beforeInjection={(svg) => {
                        svg.setAttribute('style', 'width: 35px')
                        svg.setAttribute('style', 'height: 35px')
                    }}/>
                </button>
            </div>
            <div className="block-form">
                <form id="form" className="d-flex flex-row mt-3 gap-3" onSubmit={handleSubmit}>
                    <div className="col-md-6 col-12">
                        <div className="col-12 d-flex flex-column align-items-start ms-3 gap-3 pe-4">
                            <div className="d-flex flex-column align-items-start w-100">
                                <label>Слово</label>
                                <input type="text" className="w-100" name="name" value={name}
                                       onChange={(e) => setName(e.target.value)}/>
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
                                       onChange={(e) => setUsaTranscription(e.target.value)} required={true}/>
                            </div>
                        </div>

                        <div className="col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3">
                            <div className="d-flex flex-column align-items-start w-100">
                                <label>URL сторінки</label>
                                <input type="text" className="w-100" name="usaTranscription" value={irregularVerbPt}
                                       onChange={(e) => setIrregularVerbPt(e.target.value)} required={true}/>
                            </div>
                        </div>

                        <div className="col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3">
                            <div className="d-flex flex-column align-items-start w-100">
                                <label>URL сторінки</label>
                                <input type="text" className="w-100" name="irregularVerbPp" value={irregularVerbPp}
                                       onChange={(e) => setIrregularVerbPp(e.target.value)} required={true}/>
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
                            <div>
                                <AudiPlayerMini audioName="re" blockName="Амер. аудіо"/>
                            </div>

                            <div>
                                <AudiPlayerMini audioName="ree" blockName="Бр. аудіо"/>
                                {/*<div onClick={handleTogglePlayUsaPlayer} className="play__button">*/}
                                {/*    <Lottie*/}
                                {/*        lottieRef={lottieRefUsaPlayer}*/}
                                {/*        animationData={PlayPause}*/}
                                {/*        autoplay={false}*/}
                                {/*        loop={false}*/}
                                {/*        style={{width: '100%', height: '100%'}}*/}
                                {/*        // initialSegment={play}*/}
                                {/*    />*/}
                                {/*</div>*/}
                            </div>


                        </div>

                     </div>


                    <input type="hidden" name="uuid" value={uuid} onChange={(e) => setUuid(e.target.value)}/>
                </form>
            </div>
        </>
    );
};