import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";
import Link from "next/link";
import Image from "next/image";
import NotFound from "@/app/not-found";
import {getWordLesson} from "@/app/word-lessons/cards/lesson/[uuid]/getWordLesson";
import {CardsButtonLearn} from "@/components/word-lesson/CardsButtonLearn";
import "@/components/word-lesson/word_lesson.style.css";
import {LessonWordsByLevel} from "@/app/(protected)/admin/word-lessons/word-lesson/[uuid]/getWordLessonAPI";

type Props = {
    params: {
        uuid: string;
    }
}


export default async function LearnWordLesson({params: {uuid}}: Props) {

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
                                <h1>{wordLesson.seoObject.h1}</h1>
                                <div dangerouslySetInnerHTML={{__html: (wordLesson.description)}}
                                     style={{fontSize: "1.125rem"}}/>
                                <CardsButtonLearn/>
                            </div>
                            <div className="col-md-5 col-12 ms-auto w-page-img">
                                {wordLesson.category.image && wordLesson.category.image.imageName &&
                                    <Image unoptimized src={'/api/category-img/' + wordLesson.category.image.imageName}
                                           alt="" width={120} height={180} className="wl__all_cards_img"/>
                                }
                            </div>

                        </div>
                        <div className="row col-12">
                            {wordLesson && wordLesson.lessonType === "byLevel" && (wordLesson as LessonWordsByLevel).cards && (wordLesson as LessonWordsByLevel).cards.length > 0
                                && (wordLesson as LessonWordsByLevel).cards
                                .slice()
                                .sort((a, b) => a.sortOrder - b.sortOrder)
                                .map(card => (
                                    <div key={card.uuid} className="col-12 col-md-4 d-flex align-items-stretch" style={{padding: 10}}>
                                        <div className="d-flex flex-column p-3 w-100 wl__card_container">
                                            <Image src={'/api/word-img/' + card.dictionaryPage.image.imageName} alt="" width={120} height={120}  className="mx-auto"/>
                                            <div className="me-auto">
                                                <div className="text-start">
                                                    <h3>{card.dictionaryPage.name}</h3>
                                                    <span>{card.dictionaryPage.word.usaTranscription}</span>
                                                    <p>{card.description}</p>
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