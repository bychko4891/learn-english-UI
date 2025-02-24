import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";
import {getDictionaryPageMainCategories} from "@/app/dictionary/getDictionaryPageMainCategories";
import {getAppPageByUrl} from "@/app/[url]/getAppPageByUrl";
import Image from "next/image";
import Link from "next/link";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function generateMetadata() {
    const page = await getAppPageByUrl("dictionary");
    if (page) {
        return {
            title: page.seoObject.htmlTagTitle,
            description: page.seoObject.htmlTagDescription,
        }
    }
    return {
        title: "",
        description: "",
    }
}

export default async function VocabularyMainCategories() {

    const role = cookies().get("role")?.value;
    if(role && role === "ADMIN") {
        redirect("/admin")
    }

    const categories = await getDictionaryPageMainCategories();

    return (

        <div className="app-content-area">
            <div className="main-content p-3 w-85 dictionary">
                {/*<Breadcrumb breadcrumb={breadcrumbNavigation}/>*/}
                <div className="d-flex flex-column align-items-center gap-4">
                    <h1>Словник та неправильні дієслова в англійській мові</h1>
                    {categories && categories.length > 0 && categories.map(category => (
                        <div key={category.uuid} className="row me-auto col-12" style={{margin: 0, border: "1px solid", borderRadius: 20, padding: 10}}>
                            {category.image && category.image.imageName &&
                            <div className="d-flex align-items-center col-md-2 col-12 c-img">
                                <Image unoptimized src={'/api/category-img/' + category.image.imageName} alt="" width={220} height={220} style={{borderRadius: 20}}/>
                            </div>
                            }
                            <div className="d-flex flex-column col-md-10 col-12 align-items-start">
                                <Link href={'/dictionary/category/' + category.uuid} >
                                    <h3 className="h3__link">{category.name}</h3>
                                </Link>
                                <div className="border-lr w-100 mb-2">
                                    <span dangerouslySetInnerHTML={{__html: (category.description)}}/>

                                </div>
                                <Link href={'/dictionary/category/' + category.uuid} className="more-b learn-more ms-auto mt-auto">
                                    <span className="circle" aria-hidden="true">
                                        <span className="icon arrow"></span>
                                    </span>
                                    <span className="button-text">більше...</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}