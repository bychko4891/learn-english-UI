import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";
import Link from "next/link";
import Image from "next/image";
import {getArticle} from "@/app/dictionary/article/[uuid]/getArticle";
import NotFound from "@/app/not-found";

type Props = {
    params: {
        uuid: string;
    }
}

export async function generateMetadata({params: {uuid}}: Props) {
    const article = await getArticle(uuid);
    if (article) {
        return {
            title: article.htmlTagTitle,
            description: article.htmlTagDescription,
        }
    }
    return {
        title: "",
        description: ""
    }
}

export default async function VocabularyCategories({params: {uuid}}: Props) {

    const article = await getArticle(uuid);

    if (article) {

        const breadcrumbNavigation = {
            href: "/dictionary",
            name: "Англо-український словник"
        }

        return (
            <div className="app-content-area">
                <div className="main-content p-3 w-95">
                    <Breadcrumb breadcrumb={breadcrumbNavigation}/>
                    <div className="d-flex flex-column">
                        <h1>{article.h1}</h1>
                        {article.image && article.image.imageName &&
                            <Image unoptimized src={'/api/webimg/' + article.image.imageName} alt="" width={600} height={400} style={{marginLeft: "auto", marginRight: "auto", maxWidth: "100%", height: "auto"}}/>
                        }
                        <div dangerouslySetInnerHTML={{__html: (article.description)}}/>
                        {/*{subcategories && subcategories.length > 0 && subcategories.map(category => (*/}
                        {/*    <div key={category.uuid} className="me-auto row align-items-center">*/}
                        {/*        <b>{category.name} - </b>*/}
                        {/*        {category.subcategories && category.subcategories.length > 0 && category.subcategories.map(subcategory => (*/}
                        {/*            <div key={subcategory.uuid}>*/}
                        {/*                <Link href={'/vocabulary/category/words/' + subcategory.uuid}><span*/}
                        {/*                    className="sub-cat">{subcategory.name}</span></Link>*/}
                        {/*            </div>*/}
                        {/*        ))}*/}

                        {/*    </div>*/}
                        {/*))}*/}

                        {/*{categoryResp.articles && categoryResp.articles.length > 0 &&*/}
                        {/*    <>*/}

                        {/*        <h1>{categoryResp.articles[0].category.name}</h1>*/}


                        {/*        {categoryResp.articles.map(article => (*/}

                        {/*            <div key={article.uuid} className="row me-auto col-12"*/}
                        {/*                 style={{marginBottom: 20, border: "1px solid", borderRadius: 20, padding: 10}}>*/}
                        {/*                {article.image && article.image.imageName &&*/}
                        {/*                    <div className="col-md-3 col-12 c-img">*/}
                        {/*                        <Image src={'/api/webimg/' + article.image.imageName} alt=""*/}
                        {/*                               width={250}*/}
                        {/*                               height={250} style={{borderRadius: 20}}/>*/}
                        {/*                        /!*<img src={'/api/category-img/' + category.image.imageName} alt="" style={{borderRadius: 20}}/>*!/*/}
                        {/*                    </div>*/}
                        {/*                }*/}
                        {/*                <div className="d-flex flex-column col-md-9 col-12 align-items-start">*/}
                        {/*                    <Link href={'/vocabulary/category/' + article.uuid}>*/}
                        {/*                        <h3 className="h3__link">{article.h1}</h3>*/}
                        {/*                    </Link>*/}
                        {/*                    <div className="border-lr w-100 mb-3">*/}
                        {/*                        <span dangerouslySetInnerHTML={{__html: (getDescriptionWithEllipsis(article.description))}}/>*/}

                        {/*                    </div>*/}
                        {/*                    <Link href={'/vocabulary/category/' + article.uuid}*/}
                        {/*                          className="custom-btn ms-auto mt-auto">Перейти</Link>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        ))}*/}
                        {/*    </>*/}
                        {/*}*/}


                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <NotFound />
        </>
    );
}