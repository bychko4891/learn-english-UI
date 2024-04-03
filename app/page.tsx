import {getAppPageByUrl} from "@/app/[url]/getAppPageByUrl";
import {AppPage} from "@/app/DefaultResponsesInterfaces";
import Image from "next/image";

export default async function Home() {

    const res = await getAppPageByUrl("main");

    if (res.ok) {

        const page = (await res.json()) as AppPage;

        const topContents = page.appPageContents && page.appPageContents.length > 0 ? page.appPageContents.filter(content => {
            return content.positionContent[0] === "TOP"
        }) : undefined;

        const bottomContents = page.appPageContents && page.appPageContents.length > 0 ? page.appPageContents.filter(content => {
            return content.positionContent[0] === "BOTTOM"
        }) : undefined;

        return (

            <div className="app-content-area w-95 mx-auto">

                <h1>{page.h1}</h1>
                <div className="row justify-content-between col-12">
                    {topContents && topContents.length > 0 && topContents.map(content => (
                        <div key={content.uuid} className="d-flex flex-column align-items-center col-12 col-md-3"
                             style={{perspective: '1200px'}}>
                            {content.image && content.image.imageName &&
                                <Image unoptimized src={'/api/webimg/' + content.image.imageName} width={180}
                                       height={270}
                                       alt="" style={{borderRadius: 20}}/>
                            }
                            <h3 style={{color: "#2dc26b"}}>{content.name}</h3>
                            <span dangerouslySetInnerHTML={{__html: (content.description) || 'test'}}/>
                        </div>
                    ))}
                </div>

                {bottomContents && bottomContents.length > 0 &&

                    <div className="main-content p-3 ">
                        <h3>Декілька причин вивчити англійську мову</h3>
                        <div className="d-flex flex-column">
                            {bottomContents.map((content, index) => (
                                <div key={content.uuid}
                                     className={`justify-content-between row align-items-center col-12 ${index % 2 === 0 ? 'm-bottom-content' : 'm-bottom-content__inverted'}`}>
                                    <div className="col-md-5 col-12">
                                        {content.image && content.image.imageName &&
                                            <Image unoptimized src={'/api/webimg/' + content.image.imageName}
                                                   width={280}
                                                   height={270}
                                                   alt="" style={{borderRadius: 20}}/>
                                        }
                                    </div>
                                    <div className="d-flex flex-column col-md-5 col-12">
                                        <h3 style={{color: "#2dc26b"}}>{content.name}</h3>
                                        <div dangerouslySetInnerHTML={{__html: (content.description) || 'test'}}/>

                                    </div>
                                </div>
                            ))}

                        </div>
                        {/*<div>*/}

                        {/*    <div dangerouslySetInnerHTML={{__html: (page.htmlTagDescription) || 'test'}}/>*/}
                        {/*</div>*/}

                    </div>

                }


            </div>
        );
    }

}
