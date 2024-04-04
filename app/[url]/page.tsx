import NotFound from "@/app/not-found";
import {getAppPageByUrl} from "@/app/[url]/getAppPageByUrl";
import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";

type Props = {
    params: {
        url: string;
    }
}

export async function generateMetadata({params: {url}}: Props) {
    const page = await getAppPageByUrl(url);
    if(page) {
        return {
            title: page.htmlTagTitle,
            description: page.htmlTagDescription,
        }
    }
    return {
        title: "",
        description: "",
    }
}

export default async function ApplicationPage({params: {url}}: Props) {

    const page = await getAppPageByUrl(url);

    if (page) {

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