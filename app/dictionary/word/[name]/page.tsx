import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";
import {getWord} from "@/app/dictionary/word/[name]/getWord";

type Props = {
    params: {
        name: string;
    }
}

export async function generateMetadata({params: {name}}: Props) {

    const word = await getWord(name);
    if (word) {
        return {
            title: word.htmlTagTitle,
            description: word.htmlTagDescription,
        }
    }
    return {
        title: "",
        description: "",
    }
}

export default async function Word({params: {name}}: Props) {


    const dictionaryPage = await getWord(name);

    if (dictionaryPage) {

        const breadcrumbNavigation = {
            href: "/dictionary",
            name: "Англо-український словник"
        }

        return (
            <div className="app-content-area">
                <div className="main-content p-3 w-95">
                    <Breadcrumb breadcrumb={breadcrumbNavigation}/>
                    <div className="d-flex flex-column">
                        {/*<h1>Слова категорії {dictionaryPages.length > 0 && dictionaryPages[0].category.name}</h1>*/}
                        <>
                            <b>{dictionaryPage.name}</b>
                            <b> - </b>
                            <span>{dictionaryPage.word.translate}</span>


                        </>

                    </div>
                </div>
            </div>
        );

    }

    if (dictionaryPage) {
        // if (categoryRes && categoryRes.articles && categoryRes.articles.length > 0) {
        return (
            <div className="app-content-area">
                <h1> Articles !!! </h1>
            </div>
        );
    }

    return (<></>);
}