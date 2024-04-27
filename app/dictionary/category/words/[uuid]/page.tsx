import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";
import Link from "next/link";
import {getWords} from "@/app/dictionary/category/words/[uuid]/getWords";

type Props = {
    params: {
        uuid: string;
    }
}

export default async function VocabularyCategories({params: {uuid}}: Props) {

    const dictionaryPages = await getWords(uuid);

    if (dictionaryPages) {

        const breadcrumbNavigation = {
            href: "/dictionary",
            name: "Англо-український словник"
        }

        return (
            <div className="app-content-area">
                <div className="main-content p-3 w-95">
                    <Breadcrumb breadcrumb={breadcrumbNavigation}/>
                    <div className="d-flex flex-column">
                        <h1>Слова з категорії {dictionaryPages.length > 0 && dictionaryPages[0].category.name}</h1>
                        {dictionaryPages.length > 0 && dictionaryPages.map(dictionaryPage => (
                            <>
                                {dictionaryPage.published &&
                                    <div key={dictionaryPage.uuid} className="me-auto row align-items-center">
                                        <Link href={'/dictionary/word/' + dictionaryPage.name}>
                                            <b>{dictionaryPage.name}</b>
                                        </Link>
                                        <b> - </b>
                                        <span>{dictionaryPage.word.translate}</span>
                                    </div>

                                }
                            </>
                        ))}
                    </div>
                </div>
            </div>
        );

    }

    if (dictionaryPages) {
        // if (categoryRes && categoryRes.articles && categoryRes.articles.length > 0) {
        return (
            <div className="app-content-area">
                <h1> Articles !!! </h1>
            </div>
        );
    }

    return (<></>);
}