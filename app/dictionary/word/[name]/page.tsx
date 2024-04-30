import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";
import {getWord} from "@/app/dictionary/word/[name]/getWord";
import Image from "next/image";
import "../../word.style.css";
import {AudiPlayerMini} from "@/components/audioPlayers/AudiPlayerMini";
import React from "react";

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

    const createMarkup = () => ({__html: dictionaryPage.description});

        const breadcrumbNavigation = {
            href: "/dictionary",
            name: "Англо-український словник"
        }

        return (
            <div className="app-content-area">
                <div className="main-content p-3 w-95">
                    <Breadcrumb breadcrumb={breadcrumbNavigation}/>
                    <div className="d-flex flex-column">
                        <div className="search__container">
                            <input className="search__input" type="text" placeholder="Пошук..." id="searchInput"/>
                            <div id="searchResults"></div>
                        </div>
                        <div className="row col-12 w-top-content">
                            <div className="col-md-6 col-12">
                                <div className="d-flex flex-row gap-4">
                                    <button className="" style={{height:35, width: 35, borderRadius: 10}}>+</button>
                                    <h1 style={{color: "#2dc26b"}}>{dictionaryPage.name}</h1>

                                </div>
                                <div className="text-start">
                                    <p>Переклад: {dictionaryPage.word.translate}</p>
                                </div>
                                <div className="row col-12">
                                    <div className="d-flex flex-column col-md-5 col-12" style={{border: "1px solid", borderRadius: 10, margin: 5, padding: 10}}>
                                        <div className="d-flex flex-row align-items-center gap-4">
                                            <span>Американське аудіо: </span>
                                            {!!dictionaryPage.word.audio.usaAudioName &&
                                                <AudiPlayerMini
                                                    audioSource={'/api/audio/' + dictionaryPage.word.audio.usaAudioName}
                                                    blockName=""/>}
                                        </div>
                                        <div className="me-auto">
                                            <span>Транскрипція: </span>
                                            <span>{dictionaryPage.word.usaTranscription}</span>
                                        </div>

                                    </div>
                                    <div className="d-flex flex-column col-md-5 col-12" style={{border: "1px solid", borderRadius: 10, margin: 5, padding: 10}}>
                                        <div className="d-flex flex-row align-items-center gap-4">
                                            <span>Британське аудіо: </span>
                                            {!!dictionaryPage.word.audio.brAudioName &&
                                                <AudiPlayerMini
                                                    audioSource={'/api/audio/' + dictionaryPage.word.audio.brAudioName}
                                                    blockName=""/>}
                                        </div>
                                        <div className="me-auto">
                                            <span>Транскрипція: </span>
                                            <span>{dictionaryPage.word.usaTranscription}</span>
                                        </div>

                                    </div>


                                </div>


                            </div>
                            <div className="col-md-4 col-12 ms-auto" style={{position: "relative", bottom: 60}}>
                                <Image src={'/api/word-img/' + dictionaryPage.image.imageName} alt={dictionaryPage.name}
                                       width={270} height={270} style={{borderRadius: 20}}/>
                            </div>

                        </div>
                        {/*<h1>Слова категорії {dictionaryPages.length > 0 && dictionaryPages[0].category.name}</h1>*/}
                        <>
                            {/*<b>{dictionaryPage.name}</b>*/}
                            {/*<b> - </b>*/}
                            {/*<span>{dictionaryPage.word.translate}</span>*/}


                        </>

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