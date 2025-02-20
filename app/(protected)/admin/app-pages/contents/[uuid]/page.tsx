import {AppPageContentForm} from "@/components/admin/app-pages/contents/AppPageContentForm";
import {getAppPageContent} from "@/app/(protected)/admin/app-pages/contents/[uuid]/getAppPageContent";

type Props = {
    params: {
        uuid: string;
    }
}
export default async function ApplicationPage({params: {uuid}}: Props) {


    const res = await getAppPageContent(uuid);

    return (
        <div className="app-content-area d-flex flex-column align-items-center overflow-hidden">
            <div className="main-content p-3 w-95 admin-h">
                {res.ok && <AppPageContentForm pageContent={res.ok} />}
            </div>
        </div>
    );
}