
import {AppPageContentForm} from "@/components/admin/app-pages/contents/AppPageContentForm";
import {getAppPageContentAPI} from "@/app/(protected)/admin/app-pages/contents/[uuid]/getAppPageContentAPI";
import {AppPageContentRequest} from "@/app/DefaultResponsesInterfaces";

type Props = {
    params: {
        uuid: string;
    }
}
export default async function ApplicationPage({params: {uuid}}: Props) {


    const res = await getAppPageContentAPI(uuid) as AppPageContentRequest;

    return (
        <div className="app-content-area d-flex flex-column align-items-center overflow-hidden">
            <div className="main-content p-3 w-95 admin-h">
                {res && <AppPageContentForm pageContent={res} />}
            </div>
        </div>
    );
}