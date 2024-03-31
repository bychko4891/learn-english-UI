import {getAppPageAPI} from "@/app/(protected)/admin/app-pages/[uuid]/getAppPageAPI";
import {AppPageForm} from "@/components/admin/app-pages/AppPageForm";

type Props = {
    params: {
        uuid: string;
    }
}
export default async function ApplicationPage({params: {uuid}}: Props) {

    const res = await getAppPageAPI(uuid);


    return (
        <div className="app-content-area d-flex flex-column align-items-center overflow-hidden">
            <div className="main-content p-3 w-95 admin-h">
                {res && <AppPageForm appPage={res} />}
            </div>
        </div>
    );
}