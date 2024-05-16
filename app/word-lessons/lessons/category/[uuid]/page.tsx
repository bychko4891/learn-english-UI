import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";
import {getCategoryToWordLesson} from "@/app/word-lessons/category/[uuid]/getCategoryToWordLesson";
import {WordLessonCards} from "@/components/word-lesson/WordLessonCards";

type Props = {
    params: {
        uuid: string;
    }
}

export async function generateMetadata({params: {uuid}}: Props) {

    const category = await getCategoryToWordLesson(uuid);

    if (category) {
        return {
            title: category.htmlTagTitle,
            description: category.htmlTagDescription,
        }
    }
    return {
        title: "Title E-learn",
        description: "Description E-learn",
    }
}

export default async function WordLessonsByCategory({params: {uuid}}: Props) {

    const category = await getCategoryToWordLesson(uuid);

    if (category) {

        const breadcrumbNavigation = {
            href: "/dictionary",
            name: "Англо-український словник"
        }

        return (
            <div className="app-content-area">
                <div className="main-content p-3 w-95 overflow-hidden">
                    <Breadcrumb breadcrumb={breadcrumbNavigation}/>
                    <div className="d-flex flex-column">
                        <h1>{category.name}</h1>
                        {category.wordLessons && category.wordLessons.length > 0  && <WordLessonCards wordLessons={category.wordLessons}/>}

                    </div>
                </div>
            </div>
        );

    }

    if (category) {
        // if (categoryRes && categoryRes.articles && categoryRes.articles.length > 0) {
        return (
            <div className="app-content-area">
                <h1> Articles !!! </h1>
            </div>
        );
    }

    return (<></>);
}