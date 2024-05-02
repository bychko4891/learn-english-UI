import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";
import {getWord} from "@/app/dictionary/word/[name]/getWord";
import Image from "next/image";
import "../../word.style.css";
import {AudiPlayerMini} from "@/components/audioPlayers/AudiPlayerMini";
import React from "react";
import {SearchWords} from "@/components/search/SearchWords";

type Props = {
    params: {
        name: string;
    }
}

export async function generateMetadata({params: {name}}: Props) {

    const word = await getWord(name);
    if (word) {
        return {
            title: word.htmlTagTitle,
            description: word.htmlTagDescription,
        }
    }
    return {
        title: "Title Learn English",
        description: "Description Learn English",
    }
}

export default async function Word({params: {name}}: Props) {



    const dictionaryPage = await getWord(name);

    if (dictionaryPage) {

    const createMarkup = (text: string) => ({__html: text});

        const breadcrumbNavigation = {
            href: "/dictionary",
            name: "Англо-український словник"
        }

        return (
            <div className="app-content-area">
                <div className="main-content p-3 w-95 word-page">
                    <Breadcrumb breadcrumb={breadcrumbNavigation}/>
                    {/*<div className="d-flex flex-column">*/}
                    <div className="d-flex flex-column align-items-center">
                        <SearchWords />
                        <div className="row col-12 w-top-content mt-3">
                            <div className="col-md-6 col-12">
                                <div className="d-flex flex-row gap-4">
                                    <button className="" style={{height:35, width: 35, borderRadius: 10}}>+</button>
                                    <h1 style={{color: "#2dc26b"}}>{dictionaryPage.name}</h1>

                                </div>
                                <div className="text-start">
                                    <span>Переклад: </span>
                                    <span className="span-color__highlight" style={{fontStyle: "italic"}}>{dictionaryPage.word.translate}</span>
                                </div>
                                <div className="row col-12">
                                    <div className="d-flex flex-column col-md-5-custom col-12" style={{border: "1px solid", borderRadius: 10, margin: 5, padding: 10}}>
                                        <div className="d-flex flex-row align-items-center gap-4">
                                            <span style={{fontStyle: "italic"}}>Американське аудіо: </span>
                                            {!!dictionaryPage.word.audio.usaAudioName &&
                                                <AudiPlayerMini
                                                    audioSource={'/api/audio/' + dictionaryPage.word.audio.usaAudioName}
                                                    blockName=""/>}
                                        </div>
                                        <div className="me-auto">
                                            <span>Транскрипція: </span>
                                            <span className="span-color__highlight">{dictionaryPage.word.usaTranscription}</span>
                                        </div>

                                    </div>
                                    <div className="d-flex flex-column col-md-5-custom col-12" style={{border: "1px solid", borderRadius: 10, margin: 5, padding: 10}}>
                                        <div className="d-flex flex-row align-items-center gap-4">
                                            <span style={{fontStyle: "italic"}}>Британське аудіо: </span>
                                            {!!dictionaryPage.word.audio.brAudioName &&
                                                <AudiPlayerMini
                                                    audioSource={'/api/audio/' + dictionaryPage.word.audio.brAudioName}
                                                    blockName=""/>}
                                        </div>
                                        <div className="me-auto">
                                            <span>Транскрипція: </span>
                                            <span style={{color: "#349bf4"}}>{dictionaryPage.word.usaTranscription}</span>
                                        </div>

                                    </div>


                                </div>


                            </div>
                            <div className="col-md-5 col-12 ms-auto word-page-img">
                                <Image src={'/api/word-img/' + dictionaryPage.image.imageName} alt={dictionaryPage.name}
                                       width={270} height={270} style={{borderRadius: 20}}/>
                            </div>
                        </div>
                        <div className="row col-12 border-lr">
                            <div className="col-md-6 col-12">
                                <div dangerouslySetInnerHTML={createMarkup(dictionaryPage.partOfSpeech)} className=""/>
                            </div>
                            <div className="col-md-6 col-12">
                                <div dangerouslySetInnerHTML={createMarkup(dictionaryPage.description)} className=""/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );

    }

    if (dictionaryPage) {
        // if (categoryRes && categoryRes.articles && categoryRes.articles.length > 0) {
        return (
            <div className="app-content-area">
                <h1> Articles !!! </h1>
            </div>
        );
    }

    return (<></>);
}