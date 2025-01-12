'use client'

import {ButtonBack} from "@/components/admin/ButtonBack";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {ReactSVG} from "react-svg";
import {Audio, ImageAPI, Word} from "@/app/DefaultResponsesInterfaces";
import {toast, ToastContainer, Zoom} from "react-toastify";
import {AudiPlayerMini} from "@/components/audioPlayers/AudiPlayerMini";
import {saveWordAPI} from "@/app/(protected)/admin/words/word/[uuid]/saveWordAPI";
import {getStoragesAPI, StorageFolder} from "@/app/(protected)/admin/words/word/[uuid]/getStoragesAPI";
import Image from "next/image";
import {AiGemini} from "@/components/images/AiGemini";
import {fetchAiAPI} from "@/app/(protected)/admin/words/word/[uuid]/fetchAiAPI";

export type WordLevel =
    | "A1"
    | "A2"
    | "B1"
    | "B2"
    | "C1"
    | "C2"
    | "IT";

export type WordState = {
    uuid: string;
    name: string;
    translate: string;
    brTranscription: string;
    usaTranscription: string;
    irregularVerbPt: string;
    irregularVerbPp: string;
    activeURL: boolean;
    correctVerb: boolean;
    wordLevel: string;
    image: ImageAPI;
    audio: Audio;
    imageFile: File | null;
}

export const WordForm = ({wordResp}: { wordResp: Word }) => {

    const [wordSaved, setWordSaved] = useState(wordResp);

    const imgUrl = wordResp.image ? `/api/i/${wordSaved.image?.storageId}/image/${wordResp.image.imageName}` : "";
    const [wordState, setWordState] = useState<WordState>({
        uuid: wordSaved.uuid,
        name: wordSaved.name,
        translate: wordSaved.translate,
        brTranscription: wordSaved.brTranscription,
        usaTranscription: wordSaved.usaTranscription,
        irregularVerbPt: wordSaved.irregularVerbPt,
        irregularVerbPp: wordSaved.irregularVerbPp,
        activeURL: wordSaved.activeURL,
        correctVerb: wordSaved.correctVerb,
        wordLevel: wordSaved.wordLevel,
        image: wordSaved.image ? wordSaved.image : {width: "", height: "", storageId: null} as ImageAPI,
        audio: wordSaved.audio ? wordSaved.audio : {storageId: null} as Audio,
        imageFile: null,
    })

    // console.log(JSON.stringify(wordSaved));
    const [nameError, setNameError] = useState("");
    // const [audio, setAudio] = useState<Audio>(wordResp.audio);
    const [uuid, setUuid] = useState(wordResp.uuid);

    const [brAudioFile, setBrAudioFile] = useState<File>();
    const [brAudioFileURL, setBrAudioFileURL] = useState<string>(
        (wordSaved.audio && wordSaved.audio.brAudioName && wordSaved.audio.storageId) ? `/api/a/${wordSaved.audio.storageId}/audio/${wordSaved.audio.brAudioName}` : ""
    );

    const [usaAudioFile, setUsaAudioFile] = useState<File>();
    const [usaAudioFileURL, setUsaAudioFileURL] = useState<string>(
        (wordSaved.audio && wordSaved.audio.brAudioName && wordSaved.audio.storageId) ? `/api/a/${wordSaved.audio?.storageId}/audio/${wordSaved.audio.usaAudioName}` : ""
    );

    const [image, setImage] = useState<File>();
    const [imageURL, setImageURL] = useState<string>(imgUrl);

    const [visit, setVisit] = useState(false);

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

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setImage(file);
        if(file) setWordState({...wordState, imageFile: file});
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
        const word = {
            uuid: wordState.uuid,
            name: wordState.name,
            translate: wordState.translate,
            brTranscription: wordState.brTranscription,
            usaTranscription: wordState.usaTranscription,
            irregularVerbPt: wordState.irregularVerbPt,
            irregularVerbPp: wordState.irregularVerbPp,
            activeURL: wordState.activeURL,
            correctVerb: wordState.correctVerb,
            wordLevel: wordState.wordLevel,
            audio: wordState.audio,
            image: wordState.image,
        } as Word;
        var formData = new FormData;
        formData.append('br', brAudioFile as Blob);
        formData.append('usa', usaAudioFile as Blob);
        formData.append('image', wordState.imageFile as Blob);
        formData.append('word', new Blob([JSON.stringify(word)], {type: 'application/json'}));
        try {
            const response = await saveWordAPI(formData, uuid);
            if(response){
                if (response.status === 200) {
                    toast.success(response.general);
                }
                if (response.status === 400) {
                    if(!!response.general) setNameError(response.general);
                    else setNameError(response.name);
                    toast.error("Є помилки при введенні даних!");
                }
            }else
            toast.error("Щось зламалось і запит не пройшов! Зверніться до адміністратора будь ласка.");
        } catch (error) {
            toast.error("Помилка на сервері!");
        }
    }

    async function onClickToFetchAI(e: React.MouseEvent<HTMLDivElement> , wordField: string) {
        e.preventDefault();
        if(wordField && wordState.name) {
            const res = await fetchAiAPI(wordField, wordState.name);
            console.log("RES ---------------->> |"+res.ok + "|")
            if(wordField === "irregularVerbPt" && res.ok) setWordState({...wordState, irregularVerbPt: res.ok})
            if(wordField === "irregularVerbPp" && res.ok) setWordState({...wordState, irregularVerbPp: res.ok})
            if(wordField === "brTranscription" && res.ok) setWordState({...wordState, brTranscription: res.ok})
            if(wordField === "usaTranscription" && res.ok) setWordState({...wordState, usaTranscription: res.ok})
            if(wordField === "translate" && res.ok) setWordState({...wordState, translate: res.ok})
            if(wordField === "correctVerb" && res.ok) {
                setWordState(res.ok === "true" ? {...wordState, correctVerb: false} : {
                    ...wordState,
                    correctVerb: true,
                    irregularVerbPt: "",
                    irregularVerbPp: ""
                });
            }
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
                <form id="form" className="row mt-3 gap-3" onSubmit={handleSubmit}>
                    <div className="d-flex flex-column gap-2 col-md-6 col-12">
                        <div className="col-12 d-flex flex-column align-items-start ms-3 gap-3 pe-4">
                            <div className="d-flex flex-column align-items-start w-100">
                                <label>Слово</label>
                                <input type="text" className="w-100" name="name"
                                       value={wordState.name}
                                       onChange={(e) => {
                                           wordState.name = e.target.value;
                                           setWordState({...wordState})
                                       }}
                                       required={true}
                                />
                            </div>
                        </div>
                        {!!nameError && <p className="p_error ms-3">{nameError}</p>}
                        <div className="col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3 counter-box">
                            <div className="d-flex flex-column align-items-start w-100">
                                <label>Перреклад</label>
                                <div className="d-flex flex-row w-100 gap-2">
                                    <textarea className="w-100" name="translate"
                                              value={wordState.translate}
                                              onChange={(e) => {
                                                  wordState.translate = e.target.value;
                                                  setWordState({...wordState})
                                              }}
                                    />
                                    <div className="cursor-pointer" onClick={(e) => {
                                        onClickToFetchAI(e, "translate");
                                    }}
                                    >
                                        <AiGemini width={"30"} height={"30"} fill={"#286ff2"}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3 counter-box">
                            <div className="d-flex flex-column align-items-start w-100">
                                <label>Британська транскрипція</label>
                                <div className="d-flex flex-row w-100 gap-2">
                                    <input className="w-100" name="brTranscription" value={wordState.brTranscription}
                                           onChange={(e) => {
                                               wordState.brTranscription = e.target.value;
                                               setWordState({...wordState});
                                           }}
                                    />
                                    <div className="cursor-pointer" onClick={(e) => {
                                        onClickToFetchAI(e,"brTranscription");}}
                                    >
                                        <AiGemini width={"30"} height={"30"} fill={"#286ff2"}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3">
                            <div className="d-flex flex-column align-items-start w-100">
                                <label>Американська транскрипція</label>
                                <div className="d-flex flex-row w-100 gap-2">
                                    <input type="text" className="w-100" name="usaTranscription"
                                           value={wordState.usaTranscription}
                                           onChange={(e) => {
                                               wordState.usaTranscription = e.target.value;
                                               setWordState({...wordState});
                                           }}
                                    />
                                    <div className="cursor-pointer" onClick={(e) => {
                                        onClickToFetchAI(e, "usaTranscription");
                                    }}>
                                        <AiGemini width={"30"} height={"30"} fill={"#286ff2"}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 d-flex flex-row align-items-start ms-3 gap-2 pe-3">
                            <div className="d-flex flex-row align-center w-100">
                                <div className="d-flex w-50 align-center">
                                    <span>URL слова (активне / не активне): </span>
                                </div>
                                <div className="d-flex w-50 align-center">
                                    <input className="toggle-switch" id="toggleSwitch" name="activeURL" type="checkbox"
                                           checked={wordState.activeURL}
                                           onChange={(e) => {
                                               wordState.activeURL = e.target.checked;
                                               setWordState({...wordState});
                                           }}
                                    />
                                    <label htmlFor="toggleSwitch" className="toggle-switch-label"></label>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 d-flex flex-row align-items-start ms-3 pe-3">
                            <div className="d-flex w-100"><span>Правильне дієслово (Так / Ні): </span></div>
                            <div className="d-flex flex-row w-100">
                                <input className="toggle-switch" id="toggleSwitchVerb" name="correctVerb" type="checkbox"
                                       checked={wordState.correctVerb}
                                       onChange={(e) => {
                                           wordState.correctVerb = e.target.checked;
                                           if (e.target.checked) {
                                               wordState.irregularVerbPt = "";
                                               wordState.irregularVerbPp = "";
                                           }
                                           setWordState({...wordState});
                                       }}
                                />
                                <label htmlFor="toggleSwitchVerb" className="toggle-switch-label"></label>
                                <div className="cursor-pointer ms-auto" onClick={(e) => {
                                    onClickToFetchAI(e, "correctVerb");
                                }}>
                                    <AiGemini width={"30"} height={"30"} fill={"#286ff2"}/>
                                </div>
                            </div>
                        </div>

                        {!wordState.correctVerb &&
                            (
                                <>
                                    <div className="col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3">
                                        <div className="d-flex flex-column align-items-start w-100">
                                            <label>Past Indefinite (Минулий невизначений час)</label>
                                            <div className="d-flex flex-row w-100 gap-2">
                                                <input type="text" className="w-100" name="usaTranscription"
                                                       value={wordState.irregularVerbPt}
                                                       onChange={(e) => {
                                                           wordState.irregularVerbPt = e.target.value;
                                                           setWordState({...wordState});
                                                       }}
                                                />
                                                <div className="cursor-pointer" onClick={(e) => {
                                                    onClickToFetchAI(e, "irregularVerbPt");
                                                }}>
                                                    <AiGemini width={"30"} height={"30"} fill={"#286ff2"}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3">
                                        <div className="d-flex flex-column align-items-start w-100">
                                            <label>Past Participle (Причастя минулого часу)</label>
                                            <div className="d-flex flex-row w-100 gap-2">
                                                <input type="text" className="w-100" name="irregularVerbPp"
                                                       value={wordState.irregularVerbPp}
                                                       onChange={(e) => {
                                                           wordState.irregularVerbPp = e.target.value;
                                                           setWordState({...wordState});
                                                       }}
                                                />
                                                <div className="cursor-pointer" onClick={(e) => {
                                                    onClickToFetchAI(e, "irregularVerbPp");
                                                }}>
                                                    <AiGemini width={"30"} height={"30"} fill={"#286ff2"}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        <WordLevelInput
                            wordLevel={wordState.wordLevel as WordLevel}
                            setWordLevel={(level) => {
                                wordState.wordLevel = level;
                            setWordState({...wordState});
                        }}/>

                    </div>


                    <div className="d-flex flex-column gap-2 col-md-5 col-12 mt-3">
                           <Storages
                                title={"Директорія для аудіо"}
                                storageId={wordState.audio?.storageId ?? null}
                                setStorageId={(id) => {
                                wordState.audio.storageId = id;
                                setWordState({...wordState});
                                }}
                           />

                        <div className="d-flex flex-column gap-4">

                            <div className="d-flex flex-column align-items-start gap-2">
                                <label>Британське аудіо</label>
                                <div className="d-flex flex-column w-100">
                                    <input type="file" accept=".mp3" onChange={handleBrAudioChange}/>
                                </div>
                                {!!brAudioFileURL &&
                                    <AudiPlayerMini audioSource={brAudioFileURL} blockName="Бр. аудіо"/>}
                            </div>

                            <div className="d-flex flex-column align-items-start gap-2">
                                <label>Американське аудіо</label>
                                <div className="d-flex flex-column w-100">
                                    <input type="file" accept=".mp3" onChange={handleUsaAudioChange}/>
                                </div>
                                {!!usaAudioFileURL &&
                                    <AudiPlayerMini audioSource={usaAudioFileURL} blockName="Амер. аудіо"/>}
                            </div>
                            <div className="d-flex flex-column align-items-start w-100 pt-2">
                                <div className="w-100 d-flex flex-row br-g bg-white ps-2" onClick={() => setVisit(!visit)}>
                                    <span className="align-items-start">Зображення категорії</span>
                                    <ReactSVG src="/images/arrow-down.svg" className="color-arrow-svg ms-auto"
                                              beforeInjection={(svg) => {
                                                  svg.setAttribute('style', 'width: 15px')
                                                  svg.setAttribute('style', 'height: 15px')
                                              }}/>
                                </div>


                                <div className={visit ? "w-100 block-h mt-2 visit d-flex flex-column gap-2" : "block-h"}>
                                    <Storages
                                        title={"Директорія для зображення"}
                                        setStorageId={(storageId) => {
                                            wordState.image.storageId = storageId;
                                            setWordState({...wordState});
                                        }}
                                        storageId={wordState.image.storageId}
                                    />
                                    <input type="file" className="w-100" accept="image/*"
                                           onChange={handleImageChange}
                                    />
                                    <div className="category-edit-img-container">
                                        {imageURL &&
                                            <Image unoptimized height={200} width={300} src={imageURL} alt="Uploaded Image" className="block-edit-img" />
                                        }
                                    </div>
                                    <div className="d-flex w-100 pt-2">

                                        <input className="w-40 " type="text" placeholder="width"/>
                                        <input className="w-40 ms-auto" type="text" placeholder="height"/>

                                    </div>
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

function WordLevelInput(props: {
    setWordLevel: (wordLevel: WordLevel) => void;
    wordLevel: WordLevel;
}) {
    return (
        <label className="col-12 d-flex flex-column align-items-start ms-3 gap-2 pe-3 counter-box">
            <span className="text-xl font-bold">Рівень*</span>
            <select className="d-flex align-items-start w-100 fw-semibold p-1" name="productType"
                // className="w-full rounded border border-[#D7D7D7] p-[10px] font-normal accent-transparent placeholder:text-[#D7D7D7] focus:border-[#00742F] focus:bg-[#EFFFF6] focus:outline-none focus:ring-transparent"
                value={props.wordLevel}
                onChange={(e) => props.setWordLevel(e.target.value as WordLevel)}
                required
            >
                <option></option>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C2">C1</option>
                <option value="C1">C2</option>
                <option value="IT">IT</option>
            </select>
        </label>
    );
}

function Storages(props: {
    title: string;
    setStorageId: (id: number) => void;
    storageId: number | null;
}) {

    const [storages, setStorages] = useState<StorageFolder[]>([]);

    useEffect(() => {
        (async () => {
            const {ok} = await getStoragesAPI();
            if(ok) {
                setStorages(ok);
            }
        })()
    }, []);

    return(
        <div className="position-absolute d-flex flex-column overflow-scroll align-items-start g-2 z-10 w-100 max-h-60 border bg-gray-50 py-2 font-normal">
            <label>{props.title}</label>
            <select className="cursor-pointer rounded border border-gray-300 w-100 fw-semibold"
                    value={props.storageId ?? ""}
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        if (!isNaN(value)) {
                            props.setStorageId(value);
                        }
                    }}
            >
                <option></option>
                {storages && storages.length > 0 && storages.map((storage) => {
                    return (

                        <option key={storage.id} value={storage.id}>{storage.storageName}</option>
                    );
                })}
            </select>

        </div>
    );
}