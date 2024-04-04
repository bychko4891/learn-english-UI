import {getCategory} from "@/app/vocabulary/category/[uuid]/getCategory";

type Props = {
    params: {
        uuid: string;
    }
}

export default async function VocabularyCategories({params: {uuid}}: Props) {

    const categories = await getCategory(uuid);

    return (
        <div className="app-content-area">
            <h1>Mini stories</h1>
        </div>
    );
}