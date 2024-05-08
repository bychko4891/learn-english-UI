import {Category} from "@/app/DefaultResponsesInterfaces";
import Image from "next/image";
import "./word_lesson.style.css"
import Link from "next/link";

export const WordLessonCategoryCart = ({category}: { category: Category }) => {
    return (
        <div className="d-flex flex-column p-3">
            <div className="row col-12">
                <div className="d-flex col-md-3">
                    {category.image.imageName &&
                        <Image src={`/api/category-img/${category.image.imageName}`} alt={category.name} width={110}
                               height={165}/>}
                </div>
                <div className="d-flex col-md-9 flex-column align-items-start">
                    <h3>{category.name}</h3>
                    <p>{category.miniDescription}</p>
                </div>

            </div>
            <div className="d-flex col-12">
                <div></div>
                <div className="d-flex ms-auto">
                    <Link href={'/word-lessons/category/lessons/' + category.uuid} className="more-b learn-more">
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