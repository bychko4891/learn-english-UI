'use client'

import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";
import {GeneralMessage} from "@/app/DefaultResponsesInterfaces";


const breadcrumbNavigation = {
    href: "/#",
    name: "Валідація email"
}
export const BadValidate = ({message}: { message: GeneralMessage }) => {


    return (
        <div className="app-content-area">
            <div className="main-content p-3 w-95">
                <Breadcrumb breadcrumb={breadcrumbNavigation}/>
                <h1>{message.general}</h1>
            </div>
        </div>
    );
};