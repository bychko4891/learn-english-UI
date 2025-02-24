import {getAppPageByUrl} from "@/app/[url]/getAppPageByUrl";
import Image from "next/image";
import {cookies} from "next/headers";
import { redirect } from 'next/navigation'
import {AppPageContent, getAppPageContentsByUrl} from "@/app/[url]/getAppPageContentsByUrl";
import {NoContent} from "@/components/noContent/NoContent";
import React from "react";
import ProfileFon from "public/images/11KSGbI.svg";
import Link from "next/link";


export async function generateMetadata() {

    const page = await getAppPageByUrl("main");
    if (page) {
        return {
            title: page.seoObject.htmlTagTitle,
            description: page.seoObject.htmlTagDescription,
        }
    }
    return {
        title: "Title E-learn",
        description: "Description E-learn",
    }
}

export default async function Home() {

    const role = cookies().get("role")?.value;
    if(role && role === "ADMIN") {
        redirect("/admin")
    }

    const contents = await getAppPageContentsByUrl("main");
    if(contents && contents.length > 0) {
        const positionOrder: Record<AppPageContent["position"], number> = {
            TOP: 0,
            CENTER: 1,
            BOTTOM: 2
        };

        const contentsSorted = contents.sort((a, b) => {
            const posDiff = positionOrder[a.position] - positionOrder[b.position];
            if (posDiff !== 0) return posDiff;
            return a.sortOrder - b.sortOrder;
        });


        const createMarkup = (content: AppPageContent) => {
            if (content) {
                return {__html: content.description}
            }
        };


        return (
            <div className="app-content-area w-85 mx-auto">
                {/*<div style={{maxWidth: "fit-content", width: "min-content", whiteSpace: "nowrap"}}>*/}
                    <h1>{contents[0].applicationPage.seoObject.h1}</h1>
                {/*    <div>*/}
                {/*        <Image src={ProfileFon} alt={contents[0].applicationPage.seoObject.h1} style={{*/}
                {/*            display: "flex",*/}
                {/*            maxWidth: "115%",*/}
                {/*            position: "relative",*/}
                {/*            top: -25,*/}
                {/*            left: -5,*/}
                {/*            zIndex: 0,*/}
                {/*            marginLeft: "auto"*/}
                {/*        }}/>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <p style={{fontSize: "1.2rem"}}><strong>EnglishLearn</strong> -
                    це платформа для вивчення англійської мови, яка робить ваш процес навчання швидшим і простішим.</p>
                {/*<p style={{fontSize: "1.2rem"}}><strong><span style={{color: "#3598db"}}>EnglishLearn</span></strong> -*/}
                {/*    це платформа для вивчення англійської мови, яка робить ваш процес навчання швидшим і простішим.</p>*/}
                {(() => {
                    const specialContent = contents.find(
                        (content) => content.position === "TOP" && content.sortOrder === 0
                    );
                    return specialContent ? (
                        <div key={specialContent.uuid} className="row justify-content-between col-12 align-items-center">
                            <div className="col-lg-6">
                                <div className="d-flex flex-column gap-5">
                                    <div dangerouslySetInnerHTML={createMarkup(specialContent)}/>
                                    <div className="me-auto">
                                        <Link href="#" className="h-link-s-in">
                                            <span>Почніть навчатися безкоштовно</span>
                                        </Link>
                                    </div>
                                    <div className="me-auto">
                                        <p>
                                            <span style={{fontSize: "12pt", color: "#7e8c8d"}}>
                                                10K+ користувачів&nbsp; &nbsp; &bull;&nbsp; &nbsp; 50K+ слів&nbsp; &nbsp; &bull;&nbsp; &nbsp; 100+ вправ
                                            </span>
                                        </p>
                                    </div>

                                </div>
                            </div>
                            <div className="col-lg-6" style={{paddingLeft: "10%"}}>
                                <Image
                                    src={'/api/i/' + specialContent.image.storageId + '/image/' + specialContent.image.imageName}
                                    alt={specialContent.name}
                                    width={624}
                                    height={404}
                                    style={{borderRadius: 20, maxWidth: "100%", height: "auto"}}
                                />
                            </div>
                        </div>
                    ) : null;
                })()}

                {contents
                    .filter((content) => !(content.position === "TOP" && content.sortOrder === 0))
                    .map((content) => (
                        <div key={content.uuid} className="regular-content">Звичайний контент</div>
                    ))}
            </div>
        );

    }


    // const topContents = page.appPageContents && page.appPageContents.length > 0 ? page.appPageContents.filter(content => {
    //     return content.positionContent[0] === "TOP"
    // }) : undefined;
    //
    // const bottomContents = page.appPageContents && page.appPageContents.length > 0 ? page.appPageContents.filter(content => {
    //     return content.positionContent[0] === "BOTTOM"
    // }) : undefined;

    //     return (
    //
    //         <div className="app-content-area w-95 mx-auto">
    //
    //             {/*<h1> UJKJDYF fgfdg fd gfdg fd gdfg fd fg gfd gdfg dfgdf gd fgdfg df </h1>*/}
    //
    //             {/*<h1>{page.h1}</h1>*/}
    //             {/*<div className="row justify-content-between col-12">*/}
    //             {/*    {topContents && topContents.length > 0 && topContents.map(content => (*/}
    //             {/*        <div key={content.uuid} className="d-flex flex-column align-items-center col-12 col-md-3"*/}
    //             {/*             style={{perspective: '1200px'}}>*/}
    //             {/*            {content.image && content.image.imageName &&*/}
    //             {/*                <Image unoptimized src={'/api/webimg/' + content.image.imageName} width={180}*/}
    //             {/*                       height={270}*/}
    //             {/*                       alt="" style={{borderRadius: 20}}*/}
    //             {/*                />*/}
    //             {/*            }*/}
    //             {/*            <h3 style={{color: "#2dc26b"}}>{content.name}</h3>*/}
    //             {/*            <span dangerouslySetInnerHTML={{__html: (content.description) || 'test'}}/>*/}
    //             {/*        </div>*/}
    //             {/*    ))}*/}
    //             {/*</div>*/}
    //
    //             {/*{bottomContents && bottomContents.length > 0 &&*/}
    //
    //             {/*    <div className="main-content p-3 ">*/}
    //             {/*        <h2>Декілька причин вивчити англійську мову</h2>*/}
    //             {/*        <div className="d-flex flex-column">*/}
    //             {/*            {bottomContents.map((content, index) => (*/}
    //             {/*                <div key={content.uuid}*/}
    //             {/*                     className={`justify-content-between row align-items-center col-12 ${index % 2 === 0 ? 'm-bottom-content' : 'm-bottom-content__inverted'}`}>*/}
    //             {/*                    <div className="col-md-5 col-12">*/}
    //             {/*                        {content.image && content.image.imageName &&*/}
    //             {/*                            <Image unoptimized src={'/api/webimg/' + content.image.imageName}*/}
    //             {/*                                   width={580}*/}
    //             {/*                                   height={270}*/}
    //             {/*                                   alt="" style={{borderRadius: 20, maxWidth: "100%", height: "auto"}}/>*/}
    //             {/*                        }*/}
    //             {/*                    </div>*/}
    //             {/*                    <div className="d-flex flex-column col-md-5 col-12">*/}
    //             {/*                        <h3 style={{color: "#2dc26b"}}>{content.name}</h3>*/}
    //             {/*                        <div dangerouslySetInnerHTML={{__html: (content.description) || 'test'}}/>*/}
    //
    //             {/*                    </div>*/}
    //             {/*                </div>*/}
    //             {/*            ))}*/}
    //             {/*        </div>*/}
    //
    //             {/*    </div>*/}
    //             {/*}*/}
    //
    //         </div>
    //     );
    // }

    return (
        <>
            <NoContent />
        </>
    );
}