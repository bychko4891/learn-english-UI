import {AppPageContent} from "@/app/[url]/getAppPageContentsByUrl";
import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";
import ProfileFon from "public/images/11KSGbI.svg"
import Image from "next/image";
import React from "react";

export function SimplePageView(props: {content: AppPageContent}) {

    const createMarkup = () => {
        if (props.content) {
            return {__html: props.content.description}
        }
    };

    return(
            <div className="app-content-area">
                <div className="main-content p-3 w-95">
                    <Breadcrumb href={`/${props.content.applicationPage?.url}`} name={props.content.applicationPage?.seoObject?.h1}/>
                    <div className="d-flex flex-column align-items-center">
                        {props.content && props.content.image?.imageName && props.content.image?.storageId &&
                            <Image src={`/api/i/${props.content.image.storageId}/image/${props.content.image.imageName}`}
                                   alt={props.content.applicationPage?.seoObject?.h1}
                                   width={910}
                                   height={410}
                                   style={{borderRadius: 20, maxWidth: "100%", height: "auto"}}
                            />
                        }

                        <div style={{maxWidth: "fit-content", width: "min-content", whiteSpace: "nowrap"}}>
                            <h1 style={{position: "relative", zIndex: 1, color: "#2dc26b", marginTop: 30}}>
                                {props.content.name}
                            </h1>
                            <div>
                                <Image src={ProfileFon} alt={props.content.name} style={{
                                    display: "flex",
                                    maxWidth: "115%",
                                    position: "relative",
                                    top: -25,
                                    left: -5,
                                    zIndex: 0,
                                    marginLeft: "auto"
                                }}/>
                            </div>

                        </div>

                        <div className="text-start border-lr">
                            <div dangerouslySetInnerHTML={createMarkup()}/>
                        </div>
                    </div>

                </div>
            </div>

    );
}