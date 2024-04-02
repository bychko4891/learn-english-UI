import {getAppPageByUrl} from "@/app/[url]/getAppPageByUrl";
import {AppPage} from "@/app/DefaultResponsesInterfaces";
import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";

export default async function Home() {

    const res = await getAppPageByUrl("main");

    if (res.ok) {

        const page = (await res.json()) as AppPage;

        return (

        <div className="app-content-area">
            <div className="main-content p-3 w-95">
                <div className="d-flex flex-column"></div>
                <h1>{page.h1}</h1>
                <div className="row">

                </div>

                    <div>

                        <div dangerouslySetInnerHTML={{__html: (page.htmlTagDescription) || 'test'}}/>
                    </div>

            </div>
        </div>
        )
        ;

    }

}
