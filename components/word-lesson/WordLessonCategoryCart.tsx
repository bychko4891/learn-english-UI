import {Category} from "@/app/DefaultResponsesInterfaces";
import Image from "next/image";

export const WordLessonCategoryCart = ({category}: { category: Category }) => {
    return (
        <div className="d-flex flex-column p-3">
            <div className="row col-12">
                <div className="d-flex col-md-2">
                    {category.image.imageName && <Image src={`/api/category-img/${category.image.imageName}`} alt={category.name} width={110} height={165}/>}
                </div>
                <div className="d-flex col-md-10">
                    <h3>{category.name}</h3>
                    <p>{category.miniDescription}</p>
                </div>

            </div>
            <div className="col-12">

            </div>
        </div>
    );
};