import NotFound from "@/app/not-found";
import {getAppPageByUrl} from "@/app/[url]/getAppPageByUrl";
import Image from "next/image";
import ProfileFon from "public/images/11KSGbI.svg"
import {AppPageContent, getAppPageContentsByUrl} from "@/app/[url]/getAppPageContentsByUrl";
import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";
import {SimplePageView} from "@/app/[url]/SimplePageView";
import React from "react";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

type Props = {
    params: {
        url: string;
    }
}

export async function generateMetadata({params: {url}}: Props) {

    const page = await getAppPageByUrl(url);
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

export default async function ApplicationPage({params: {url}}: Props) {

    const role = cookies().get("role")?.value;
    if(role && role === "ADMIN") {
        redirect("/admin")
    }

    const contents = await getAppPageContentsByUrl(url);

    if (contents && contents.length > 0) {

        if(contents[0].applicationPage?.pageType === "SIMPLE") {
            return (
                <>
                    <SimplePageView content={contents[0]} />
                </>
            );
        }


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
        // const createMarkup = () => ({__html: content.description});


        return (
            <div className="app-content-area">
                <div className="main-content p-3 w-95">
                    {/*<Breadcrumb href={`/${url}`} name={contents[0].applicationPage?.seoObject?.h1}/>*/}
                    <div className="d-flex flex-column align-items-center">
                        <h1 style={{position: "relative", zIndex: 1, color: "#2dc26b", marginTop: 30}}>
                            {contents[0].applicationPage.seoObject.h1}
                        </h1>
                        <div>
                            <Image src={ProfileFon} alt={contents[0].applicationPage.seoObject.h1} style={{
                                display: "flex",
                                maxWidth: "115%",
                                position: "relative",
                                top: -25,
                                left: -5,
                                zIndex: 0,
                                marginLeft: "auto"
                            }}/>
                        </div>
                        {contentsSorted.map((content) => {
                            return (
                                <>
                                    {content.position === "TOP" && content.sortOrder === 0 &&
                                        <Image src={'/api/webimg/' + content.image.imageName} alt={content.name}
                                               width={910}
                                               height={410}
                                               style={{borderRadius: 20, maxWidth: "100%", height: "auto"}}
                                        />
                                    }

                                    <div className="text-start border-lr">
                                        <div dangerouslySetInnerHTML={createMarkup(content)}/>
                                    </div>
                                </>
                            );
                        })}


                        {/*<div style={{maxWidth: "fit-content", width: "min-content", whiteSpace: "nowrap"}}>*/}


                        {/*</div>*/}

                        {/*<div className="text-start border-lr">*/}
                        {/*   <div dangerouslySetInnerHTML={createMarkup()}/>}*/}
                        {/*</div>*/}
                    </div>

                </div>
            </div>
        );
    }

    return (
        <>
            <NotFound/>
        </>
    );
}