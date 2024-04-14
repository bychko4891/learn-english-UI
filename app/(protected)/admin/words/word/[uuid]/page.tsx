import {getWordAPI} from "@/app/(protected)/admin/words/word/[uuid]/getWordAPI";
import {WordForm} from "@/components/admin/words/WordForm";

type Props = {
    params: {
        uuid: string;
    }
}
export default async function WordPage({params: {uuid}}: Props) {


    const res = await getWordAPI(uuid);

    return (
        <div className="app-content-area d-flex flex-column align-items-center overflow-hidden">
            <div className="main-content p-3 w-95 admin-h">
                {res && <WordForm wordResp={res} />}
            </div>
        </div>
    );
}