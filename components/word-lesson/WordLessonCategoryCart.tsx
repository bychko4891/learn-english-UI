import {Category} from "@/app/DefaultResponsesInterfaces";
import Image from "next/image";
import "./word_lesson.style.css"
import Link from "next/link";
import LessonsSvg from "@/public/images/lessons_count.svg"
import WordsSvg from "@/public/images/words_count.svg"
import ClockSvg from "@/public/images/clock.svg"
import "./word_lesson.style.css"

export const WordLessonCategoryCart = ({category}: { category: Category }) => {

    const countLessons = category.wordLessons.length ? category.wordLessons.length : 0;
    let countWords = 0;
    for (let i = 0; i < category.wordLessons.length; i++) {
        countWords += category.wordLessons[i].cards.length;
    }
    let hours = 0;
    let minutes = 0;
    if(countWords > 0) {
        let fullMinutes = Math.ceil(countWords * 1.9987);
        hours = Math.floor(fullMinutes / 60);
        minutes = fullMinutes - (hours * 60);
    }




    return (
        <div className="d-flex flex-column py-3">
            <div className="d-flex gap-2">
                    {category.image.imageName &&
                        <Image src={`/api/category-img/${category.image.imageName}`} alt={category.name} width={110}
                               height={165}/>}
                <div className="d-flex flex-column align-items-start">
                    <Link href={'/word-lessons/lessons/category/' + category.uuid} >
                        <h3>{category.name}</h3>
                    </Link>
                    <p className="truncated-text">{category.miniDescription}</p>
                </div>

            </div>
            <div className="d-flex col-12 align-items-center">
                <div className="d-flex flex-row gap-2 mt-3">
                    <div className="d-flex flex-row gap-1">
                        <Image src={LessonsSvg} alt="Занять в категорії" className="colored-svg reset-styles"/>
                        <span>{countLessons}</span>
                        <span className="info_w_l"> занять</span>
                    </div>
                    <div className="d-flex flex-row gap-1">
                        <Image src={WordsSvg} alt="Занять в категорії" className="colored-svg reset-styles"/>
                        <span>{countWords}</span>
                        <span className="info_w_l"> слів</span>
                    </div>
                    <div className="d-flex flex-row gap-1">
                        <Image src={ClockSvg} alt="Занять в категорії" className="colored-svg reset-styles"/>
                        {/*<span>{hours} г</span>*/}
                        {hours !== 0 ? <span>{hours} г</span> : ""}
                        <span>{minutes}</span>
                        <span> хв</span>
                    </div>

                </div>
                <div className="d-flex ms-auto">
                    <Link href={'/word-lessons/lessons/category/' + category.uuid} className="more-b learn-more">
                        <span className="circle" aria-hidden="true">
                        <span className="icon arrow"></span>
                            </span>
                        <span className="button-text">більше...</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};