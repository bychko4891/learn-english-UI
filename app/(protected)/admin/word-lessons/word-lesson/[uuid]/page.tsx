import {WordLessonEdit} from "@/components/admin/wordLessons/WordLessonEdit";
import {getWordLessonAPI} from "@/app/(protected)/admin/word-lessons/word-lesson/[uuid]/getWordLessonAPI";
import {DeleteJwtAccessToken} from "@/app/(protected)/jwtSessionService/DeleteJwtAccessToken";

type Props = {
    params: {
        uuid: string;
    }
}
export default async function WordLessonPage({params: {uuid}}: Props) {

    const resp = await getWordLessonAPI(uuid);

    if (resp) {
        return (
            <div className="app-content-area d-flex flex-column align-items-center overflow-hidden">
                <div className="main-content p-3 w-95 admin-h">
                    {resp && <WordLessonEdit wordLessonResp={resp}/>}
                </div>
            </div>
        );
    }
    return (
        <>
            <DeleteJwtAccessToken />
        </>
    );
}