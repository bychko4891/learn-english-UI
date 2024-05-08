import {getCategoryToDictionary} from "@/app/dictionary/category/[uuid]/getCategoryToDictionary";
import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";
import Link from "next/link";
import Image from "next/image";
import {NoContent} from "@/components/noContent/NoContent";
import {SearchWords} from "@/components/search/SearchWords";
import React from "react";

type Props = {
    params: {
        uuid: string;
    }
}

export async function generateMetadata({params: {uuid}}: Props) {

    const categoryResp = await getCategoryToDictionary(uuid);
    if (categoryResp) {
        return {
            title: categoryResp.category.htmlTagTitle,
            description: categoryResp.category.htmlTagDescription,
        }
    }
    return {
        title: "",
        description: ""
    }
}

export default async function DictionaryCategories({params: {uuid}}: Props) {

    const categoryResp = await getCategoryToDictionary(uuid);

    if (categoryResp) {

        const subcategories = categoryResp.category.subcategories;

        const articles = categoryResp.t;

        const getDescriptionWithEllipsis = (text: string) => {
            if (text.length > 300) {
                return `${text.substring(0, 300)}...`;
            } else {
                return text;
            }
        };

        const breadcrumbNavigation = {
            href: "/dictionary",
            name: "Англо-український словник"
        }

        return (
            <div className="app-content-area">
                <div className="main-content p-3 w-95 dictionary">
                    <Breadcrumb breadcrumb={breadcrumbNavigation}/>
                    <div className="d-flex flex-column">
                        <div className="col-md-6 col-12">
                            <SearchWords/>
                        </div>
                        <h1>{categoryResp.category.name}</h1>
                        {subcategories && subcategories.length > 0 && subcategories.map(category => (
                            <div key={category.uuid} className="me-auto row align-items-center">
                                <b>{category.name} - </b>
                                {category.subcategories && category.subcategories.length > 0 && category.subcategories.map(subcategory => (
                                    <div key={subcategory.uuid}>
                                        <Link href={'/dictionary/category/words/' + subcategory.uuid}><span
                                            className="sub-cat">{subcategory.name}</span></Link>
                                    </div>
                                ))}
                            </div>
                        ))}

                        {articles && articles.length > 0 &&
                            <>
                                {/*<h1>{articles[0].category.name}</h1>*/}

                                {articles.map(article => (

                                    <div key={article.uuid} className="row me-auto col-12"
                                         style={{marginBottom: 20, border: "1px solid", borderRadius: 20, padding: 10}}>
                                        {article.image && article.image.imageName &&
                                            <div className="col-md-2 col-12 c-img my-auto">
                                                <Image unoptimized src={'/api/webimg/' + article.image.imageName} alt=""
                                                       width={250}
                                                       height={250} style={{borderRadius: 20}}/>
                                            </div>
                                        }
                                        <div className="d-flex flex-column col-md-10 col-12 align-items-start">
                                            <Link href={'/dictionary/article/' + article.uuid}>
                                                <h3 className="h3__link">{article.h1}</h3>
                                            </Link>
                                            <div className="border-lr w-100 mb-3">
                                                <span
                                                    dangerouslySetInnerHTML={{__html: (getDescriptionWithEllipsis(article.description))}}/>

                                            </div>
                                            <Link href={'/dictionary/article/' + article.uuid} className="more-b learn-more ms-auto mt-auto">
                                                <span className="circle" aria-hidden="true">
                                                    <span className="icon arrow"></span>
                                                </span>
                                                <span className="button-text">більше...</span>
                                            </Link>
                                            {/*<Link href={'/dictionary/category/article/' + article.uuid}*/}
                                            {/*      className="custom-btn ms-auto mt-auto">Перейти</Link>*/}
                                        </div>
                                    </div>
                                ))}
                            </>
                        }

                        {(!subcategories || subcategories.length === 0) && (!articles || articles.length === 0) &&
                            <>
                                <NoContent/>
                            </>
                        }

                    </div>
                </div>
            </div>
        );
    }

    const breadcrumbNavigation = {
        href: "/vocabulary",
        name: "Англо-український словник"
    }

    return (
        <div className="app-content-area">
            <div className="main-content p-3 w-95">
                <Breadcrumb breadcrumb={breadcrumbNavigation}/>
                <NoContent/>
            </div>
        </div>
    );
}