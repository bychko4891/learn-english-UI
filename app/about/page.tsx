"use server";

import {getServerSession} from "next-auth";
import {authConfig} from "@/configs/auth";
import {getAboutAPI} from "@/app/about/getAboutAPI";
import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";


type Resp = {
    name: string;
    text: string;
}

export default async function About() {

    const breadcrumbNavigation = {
        href: "/about",
        name: "Про нас"
    }

    const session = await getServerSession(authConfig);
    const about = await getAboutAPI();


    return (
        <div className="app-content-area">
            <div className="main-content p-3 w-95">
                <Breadcrumb breadcrumb={breadcrumbNavigation} />
                <div className="row">
                    {about?.contentsAppPage.map(content => (
                        <div key={content.h1}>
                            <h1>{content.h1}</h1>
                            <div dangerouslySetInnerHTML={{__html: (content.description) || 'test'}}/>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    );
}


