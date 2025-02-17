'use client'

import {ReactSVG} from "react-svg";
import "./word_lesson.style.css";
import {useState} from "react";
import Image from "next/image";
import LessonsSvg from "public/images/lessons_count.svg";
import WordsSvg from "public/images/words_count.svg";
import ClockSvg from "public/images/clock.svg";
import Link from "next/link";
import {LessonWords} from "@/app/(protected)/admin/word-lessons/word-lesson/[uuid]/getWordLessonAPI";

export const WordLessonCards = ({wordLessons}: { wordLessons: LessonWords[] }) => {
    const [wlCardActive, setWlCardActive] = useState(0)

    const handleClick = (index: number) => {
        setWlCardActive(index);

    }

    const getMinutes = (countCards: number) => {
        return Math.ceil(countCards * 1.88);
    }


    return (
        <div className="d-flex flex-column gap-4">
            {wordLessons
                .slice()
                .sort((a, b) => a.sortOrder - b.sortOrder)
                .map((wordLesson, index) => (
                <div key={wordLesson.uuid}
                     className={wlCardActive === index ? "d-flex flex-column wl-card-container active" : "d-flex flex-column wl-card-container"}
                     onClick={() => handleClick(index)}>
                    <div className={wlCardActive === index ? "d-flex flex-row align-items-center wl-card__mini" : "d-flex flex-row align-items-center"}>
                        <div className="d-flex flex-row align-items-center">
                            <ReactSVG beforeInjection={(svg) => {
                                svg.setAttribute('style', 'height: 25px; width: 25px;')
                            }} src="/images/arrow-next.svg" className={index === wlCardActive ? "colored-svg reset-styles me-2 arrow-active" : "colored-svg reset-styles me-1"}/>

                            <h3>{wordLesson.name}</h3>
                        </div>

                        <div className="count-container ms-auto">
                            <ReactSVG beforeInjection={(svg) => {
                                svg.setAttribute('style', 'height: 45px; width: 45px;')
                            }} src="/images/sort-order.svg" className="image-count_container"/>
                            <div className="text-count-overlay">
                                <span className={wordLesson.sortOrder < 10 ? "p-3" : "p-2-1"}>{wordLesson.sortOrder}</span>
                            </div>
                        </div>

                    </div>

                    <div className={index === wlCardActive ? "l-u-info active" : "l-u-info"}>
                        {wordLesson.name}
                    </div>
                    {/*<div className="l-info">*/}
                        <div className={index === wlCardActive ? "d-flex col-12 align-items-center l-info active" : "d-flex col-12 align-items-center l-info"}>
                            <div className="d-flex flex-row gap-2">
                                <div className="d-flex flex-row gap-1">
                                    <ReactSVG beforeInjection={(svg) => {
                                        svg.setAttribute('style', 'height: 20px; width: 20px;')
                                    }} src="/images/words_count.svg" className="colored-svg reset-styles"/>
                                    { wordLesson.cards ? <span>{wordLesson.cards.length}</span> : <span>0</span>}
                                    <span className="info_w_l"> слів(a)</span>
                                </div>
                                <div className="d-flex flex-row gap-1">
                                    <ReactSVG beforeInjection={(svg) => {
                                        svg.setAttribute('style', 'height: 20px; width: 20px;')
                                    }} src="/images/clock.svg" className="colored-svg reset-styles"/>

                                    {wordLesson.cards ?
                                        <span>{getMinutes(wordLesson.cards.length)}</span>
                                        :
                                        <span>0</span>
                                    }
                                    <span> хв</span>
                                </div>

                            </div>
                            <div className="d-flex ms-auto">
                                <Link href={'/word-lessons/cards/lesson/' + wordLesson.uuid} >
                                    <ReactSVG beforeInjection={(svg) => {
                                        svg.setAttribute('style', 'height: 38px; width: 38px;')
                                        }} src="/images/cards.svg" className="all-cards__svg reset-styles me-2"/>
                                </Link>
                                <Link href={'/word-lessons/lessons/category/' + wordLesson.uuid} className="more-b learn-more">
                                <span className="circle" aria-hidden="true">
                                    <span className="icon arrow"></span>
                                </span>
                                    <span className="button-text">більше...</span>
                                </Link>
                            </div>
                        </div>

                    </div>


                // </div>
            ))}
        </div>
    );
};