import {getCategoryToDictionary} from "@/app/dictionary/category/[uuid]/getCategoryToDictionary";
import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";
import {NoContent} from "@/components/noContent/NoContent";
import React from "react";
import {getCategoryToWordLesson} from "@/app/vocabulary/category/[uuid]/getCategoryToWordLesson";
import {WordLessonCategoryCard} from "@/components/word-lesson/WordLessonCategoryCard";

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
        title: "Learn English",
        description: "Learn English"
    }
}

export default async function WordLessonCategories({params: {uuid}}: Props) {

    const categoryResp = await getCategoryToWordLesson(uuid);

    if (categoryResp) {

        const subcategories = categoryResp.subcategories;

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
                <div className="main-content p-3 w-95 word-lesson">
                    <Breadcrumb breadcrumb={breadcrumbNavigation}/>
                    <div className="d-flex flex-column align-items-center">
                        <h1>{categoryResp.name}</h1>
                        <div className="row col-12 justify-content-around gap-4">
                            {subcategories && subcategories.length > 0 && subcategories
                                .slice()
                                .sort((a, b) => a.sortOrder - b.sortOrder)
                                .map(category => (
                                <div key={category.uuid} className="col-md-5 col-12" style={{border: "1px solid", borderRadius: 20}}>
                                    <WordLessonCategoryCard category={category} />
                                </div>
                            ))}
                        </div>
                        {categoryResp.wordLessons && categoryResp.wordLessons.length > 0 &&
                            <>
                                <h1>{categoryResp.wordLessons[0].category.name}</h1>

                                {/*{categoryResp.t.map(article => (*/}

                                {/*    <div key={article.uuid} className="row me-auto col-12"*/}
                                {/*         style={{marginBottom: 20, border: "1px solid", borderRadius: 20, padding: 10}}>*/}
                                {/*        {article.image && article.image.imageName &&*/}
                                {/*            <div className="col-md-3 col-12 c-img my-auto">*/}
                                {/*                <Image unoptimized src={'/api/webimg/' + article.image.imageName} alt=""*/}
                                {/*                       width={250}*/}
                                {/*                       height={250} style={{borderRadius: 20}}/>*/}
                                {/*            </div>*/}
                                {/*        }*/}
                                {/*        <div className="d-flex flex-column col-md-9 col-12 align-items-start">*/}
                                {/*            <Link href={'/dictionary/category/article/' + article.uuid}>*/}
                                {/*                <h3 className="h3__link">{article.h1}</h3>*/}
                                {/*            </Link>*/}
                                {/*            <div className="border-lr w-100 mb-3">*/}
                                {/*                <span*/}
                                {/*                    dangerouslySetInnerHTML={{__html: (getDescriptionWithEllipsis(article.description))}}/>*/}

                                {/*            </div>*/}
                                {/*            <Link href={'/dictionary/category/article/' + article.uuid}*/}
                                {/*                  className="custom-btn ms-auto mt-auto">Перейти</Link>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*))}*/}
                            </>
                        }

                        {(!subcategories || subcategories.length === 0) && (!categoryResp.wordLessons || categoryResp.wordLessons.length === 0) &&
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