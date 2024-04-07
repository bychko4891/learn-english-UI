import {getCategory} from "@/app/vocabulary/category/[uuid]/getCategory";
import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";
import Link from "next/link";

type Props = {
    params: {
        uuid: string;
    }
}

export default async function VocabularyCategories({params: {uuid}}: Props) {

    const categoryRes = await getCategory(uuid);

    if (categoryRes && categoryRes.category && !categoryRes.articles || categoryRes?.articles?.length === 0) {

        const subcategories = categoryRes.category.subcategories;

        const breadcrumbNavigation = {
            href: "/vocabulary",
            name: "Англо-український словник"
        }

        return (
            <div className="app-content-area">
                <div className="main-content p-3 w-95">
                    <Breadcrumb breadcrumb={breadcrumbNavigation}/>
                    <div className="d-flex flex-column">
                        {subcategories && subcategories.length > 0 && subcategories.map(category => (
                            <div key={category.uuid} className="me-auto row align-items-center" >
                                <b>{category.name} - </b>
                                {category.subcategories && category.subcategories.length > 0 && category.subcategories.map(subcategory => (
                                    <div key={subcategory.uuid}>
                                        <Link href={'/vocabulary/category/words/' + subcategory.uuid}><span className="sub-cat">{subcategory.name}</span></Link>
                                    </div>
                                ))}

                            </div>
                        ))}

                    </div>
                </div>
            </div>
        );
    }

    if (categoryRes && categoryRes.articles && categoryRes.articles.length > 0) {
        return (
            <div className="app-content-area">
                <h1> Articles !!! </h1>
            </div>
        );
    }

    return (<></>);
}