import {getAppPage} from "@/app/(protected)/admin/app-pages/[uuid]/getAppPage";
import {AppPageForm} from "@/components/admin/app-pages/AppPageForm";

type Props = {
    params: {
        uuid: string;
    }
}
export default async function ApplicationPage({params: {uuid}}: Props) {

    const res = await getAppPage(uuid);

    return (
        <div className="app-content-area d-flex flex-column align-items-center overflow-hidden">
            <div className="main-content p-3 w-95 admin-h">
                {res.ok && <AppPageForm appPage={res.ok} />}
            </div>
        </div>
    );
}