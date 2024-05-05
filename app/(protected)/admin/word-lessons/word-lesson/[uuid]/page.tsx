import {WordLessonEdit} from "@/components/admin/wordLessons/WordLessonEdit";
import {getWordLessonAPI} from "@/app/(protected)/admin/word-lessons/word-lesson/[uuid]/getWordLessonAPI";
import { v4 as uuidv4 } from 'uuid';

type Props = {
    params: {
        uuid: string;
    }
}
export default async function WordLessonPage({params: {uuid}}: Props) {

    const res = await getWordLessonAPI(uuid);

    return (
        <div className="app-content-area d-flex flex-column align-items-center overflow-hidden">
            <div className="main-content p-3 w-95 admin-h">
                {res && <WordLessonEdit wordLessonResp={res} />}
            </div>
        </div>
    );
}