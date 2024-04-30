import NotFound from "@/app/not-found";
import {getAppPageByUrl} from "@/app/[url]/getAppPageByUrl";
import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";
import Image from "next/image";
import ProfileFon from "public/images/11KSGbI.svg"

type Props = {
    params: {
        url: string;
    }
}

export async function generateMetadata({params: {url}}: Props) {

    const page = await getAppPageByUrl(url);
    if (page) {
        return {
            title: page.htmlTagTitle,
            description: page.htmlTagDescription,
        }
    }
    return {
        title: "Title E-learn",
        description: "Description E-learn",
    }
}

export default async function ApplicationPage({params: {url}}: Props) {

    const page = await getAppPageByUrl(url);

    if (page) {

        const content = page.appPageContents && page.appPageContents.length > 0 ? page.appPageContents[0] : null;
        const createMarkup = () => {
            if (content) {
                return {__html: content.description}
            }
        };
        // const createMarkup = () => ({__html: content.description});

        const breadcrumbNavigation = {
            href: `/${url}`,
            name: page.h1
        }

        return (

            <div className="app-content-area">
                <div className="main-content p-3 w-95">
                    <Breadcrumb breadcrumb={breadcrumbNavigation}/>
                    <div className="d-flex flex-column align-items-center">
                        {content && content.image.imageName &&
                            <Image src={'/api/webimg/' + content.image.imageName} alt={page.h1} width={910}
                                   height={410} style={{borderRadius: 20, maxWidth: "100%", height: "auto"}}/>
                        }

                        <div style={{maxWidth: "fit-content", width: "min-content", whiteSpace: "nowrap"}}>
                            <h1 style={{
                                position: "relative",
                                zIndex: 1,
                                color: "#2dc26b",
                                marginTop: 30
                            }}>{page.h1}</h1>

                            <div>
                                <Image src={ProfileFon} alt={page.h1} style={{
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
                            {content && <div dangerouslySetInnerHTML={createMarkup()}/>}
                        </div>
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