import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";
import Link from "next/link";
import Image from "next/image";
import NotFound from "@/app/not-found";
import {getWordLesson} from "@/app/word-lessons/cards/lesson/[uuid]/getWordLesson";
import {CardsButtonLearn} from "@/components/word-lesson/CardsButtonLearn";
import "@/components/word-lesson/word_lesson.style.css";

type Props = {
    params: {
        uuid: string;
    }
}

export async function generateMetadata({params: {uuid}}: Props) {
    const wordLesson = await getWordLesson(uuid);
    if (wordLesson) {
        return {
            title: wordLesson.htmlTagTitle,
            description: wordLesson.htmlTagDescription,
        }
    }
    return {
        title: "Title E-learn",
        description: "Description E-learn",
    }
}

export default async function WordLessonCards({params: {uuid}}: Props) {

    const wordLesson = await getWordLesson(uuid);

    if (wordLesson) {

        const breadcrumbNavigation = {
            href: "/dictionary",
            name: "Англо-український словник"
        }

        return (
            <div className="app-content-area">
                <div className="main-content p-3 w-95">
                    <Breadcrumb breadcrumb={breadcrumbNavigation}/>
                    <div className="d-flex flex-column align-items-center">
                        <div className="row col-12 w-top-content">
                            <div className="col-md-6 col-12 text-start">
                                <h1>{wordLesson.h1}</h1>
                                <div dangerouslySetInnerHTML={{__html: (wordLesson.description)}} style={{fontSize: "1.125rem"}}/>
                                <CardsButtonLearn />
                            </div>
                            <div className="col-md-5 col-12 ms-auto w-page-img">
                                {wordLesson.category.image && wordLesson.category.image.imageName &&
                                 <Image unoptimized src={'/api/category-img/' + wordLesson.category.image.imageName} alt="" width={120} height={180} style={{marginLeft: "auto", marginRight: "auto", maxWidth: "100%", height: "auto", borderRadius: 10}}/>
                                }
                            </div>

                        </div>
                        <div className="row col-12">
                            {wordLesson.cards && wordLesson.cards.length > 0 && wordLesson.cards
                                .slice()
                                .sort((a, b) => a.sortOrder - b.sortOrder)
                                .map(card => (
                                    <div key={card.uuid} className="col-12 col-md-4 d-flex align-items-stretch " style={{ padding: 10}}>
                                        <div className="d-flex flex-column p-3 w-100" style={{borderRadius: 10, boxShadow: "0 4px 10px 2px rgb(24 24 24)"}}>
                                            <Image src={'/api/word-img/' + card.dictionaryPage.image.imageName} alt="" width={120} height={120} style={{borderRadius: 10}} className="mx-auto"/>
                                            <div className="me-auto">
                                                <div className="text-start">
                                                    <h3 style={{color: "#4d90f5"}}>{card.dictionaryPage.name}</h3>
                                                    <span>{card.dictionaryPage.word.usaTranscription}</span>
                                                    <div style={{margin: 0, padding: 0}}>
                                                        <p>{card.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-auto d-flex flex-row align-items-center">
                                                <div>
                                                    <button>+</button>
                                                </div>
                                                <div className="ms-auto">
                                                    <Link href={'/dictionary/word/' + card.dictionaryPage.name}>
                                                        <Image src="/images/link-word.svg" alt="" height={30} width={30} className="colored-svg reset-styles"/>
                                                    </Link>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                ))}


                        </div>

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