import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";
import {getMainCategories} from "@/app/vocabulary/getMainCategories";
import {getAppPageByUrl} from "@/app/[url]/getAppPageByUrl";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata() {
    const page = await getAppPageByUrl("vocabulary");
    if (page) {
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

export default async function VocabularyMainCategories() {

    const breadcrumbNavigation = {
        href: "/vocabulary",
        name: "Англо-український словник"
    }

    const categories = await getMainCategories();



    return (

        <div className="app-content-area">
            <div className="main-content p-3 w-95">
                <Breadcrumb breadcrumb={breadcrumbNavigation}/>
                <div className="d-flex flex-column align-items-center gap-4">
                    <h1>Англо-український словник</h1>
                    {categories && categories.length > 0 && categories.map(category => (
                        <div key={category.uuid} className="row me-auto col-12" style={{margin: 0, border: "1px solid", borderRadius: 20, padding: 10}}>
                            {category.image && category.image.imageName &&
                            <div className="col-md-3 col-12 c-img">
                                <Image src={'/api/category-img/' + category.image.imageName} alt="" width={250} height={250} style={{borderRadius: 20}}/>
                                {/*<img src={'/api/category-img/' + category.image.imageName} alt="" style={{borderRadius: 20}}/>*/}
                            </div>
                            }
                            <div className="d-flex flex-column col-md-9 col-12 align-items-start">
                                <Link href={'/vocabulary/category/' + category.uuid} >
                                    <h3 className="h3__link">{category.name}</h3>
                                </Link>
                                <div className="border-lr w-100 mb-3">
                                    <span dangerouslySetInnerHTML={{__html: (category.description)}}/>

                                </div>
                                <Link href={'/vocabulary/category/' + category.uuid} className="custom-btn ms-auto mt-auto">Перейти</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}