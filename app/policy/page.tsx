import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";

export default function Policy() {

    const breadcrumbNavigation = {
        href: "/policy",
        name: "Правила та умови"
    }

    return (
        <div className="app-content-area">
            <div className="main-content p-3 w-95">
                <Breadcrumb breadcrumb={breadcrumbNavigation} />
                <h1>Policy</h1>
            </div>
        </div>
    );
}