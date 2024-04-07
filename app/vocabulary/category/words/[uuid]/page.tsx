import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";
import Link from "next/link";
import {getWords} from "@/app/vocabulary/category/words/[uuid]/getWords";

type Props = {
    params: {
        uuid: string;
    }
}

export default async function VocabularyCategories({params: {uuid}}: Props) {

    const wordsRes = await getWords(uuid);

    if (wordsRes) {

        const breadcrumbNavigation = {
            href: "/vocabulary",
            name: "Англо-український словник"
        }

        return (
            <div className="app-content-area">
                <div className="main-content p-3 w-95">
                    <Breadcrumb breadcrumb={breadcrumbNavigation}/>
                    <div className="d-flex flex-column">
                        <h1>Слова категорії {wordsRes.length > 0 && wordsRes[0].category.name}</h1>
                        {wordsRes.length > 0 && wordsRes.map(word => (
                            <div key={word.uuid} className="me-auto row align-items-center">
                                <b>{word.name} - </b>
                                {/*{category.subcategories && category.subcategories.length > 0 && category.subcategories.map(subcategory => (*/}
                                {/*    <div key={subcategory.uuid}>*/}
                                {/*        <Link href={subcategory.uuid}><span className="sub-cat">{subcategory.name}</span></Link>*/}
                                {/*    </div>*/}
                                {/*))}*/}

                            </div>
                        ))}

                    </div>
                </div>
            </div>
        );

    }

    if (wordsRes) {
    // if (categoryRes && categoryRes.articles && categoryRes.articles.length > 0) {
        return (
            <div className="app-content-area">
                <h1> Articles !!! </h1>
            </div>
        );
    }

    return (<></>);
}