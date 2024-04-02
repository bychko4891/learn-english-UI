import NotFound from "@/app/not-found";
import {getAppPageByUrl} from "@/app/[url]/getAppPageByUrl";
import {AppPage} from "@/app/DefaultResponsesInterfaces";
import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";

type Props = {
    params: {
        url: string;
    }
}
export default async function ApplicationPage({params: {url}}: Props) {

    const res = await getAppPageByUrl(url);


    if (res.ok) {

        const page = (await res.json()) as AppPage;

        const breadcrumbNavigation = {
            href: `/${url}`,
            name: page.h1
        }

        return (

            <div className="app-content-area">
                <div className="main-content p-3 w-95">
                    <Breadcrumb breadcrumb={breadcrumbNavigation}/>
                    <div className="row">

                            <div>
                                <h1>{page.h1}</h1>
                                <div dangerouslySetInnerHTML={{__html: (page.htmlTagDescription) || 'test'}}/>
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