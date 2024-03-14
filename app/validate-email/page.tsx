import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";
import {Test} from "@/components/Test";


type Props = {
    params: {
        uuid: string;
    }
}


// export default async function ValidateEmail({params: { uuid }}: Props) {
export default async function ValidateEmail() {




    const breadcrumbNavigation = {
        href: "/policy",
        name: "Правила та умови"
    }
    // const response = await fetch('http://localhost:3000/api/validate-email', {
    //     method: "GET",
    //     headers: {
    //         "uuid": uuid
    //     }
    //
    // });
    // console.log(response);

     // const res = (await response.json()) as  BadResp;
const uuid = "83409603986903486"
    return (
        <div className="app-content-area">
            <div className="main-content p-3 w-95">
                <Breadcrumb breadcrumb={breadcrumbNavigation} />
                <h1>{uuid}</h1>
                {/*<h1>{res.fieldMessage}</h1>*/}
                <Test uuid={uuid} />
            </div>
        </div>
    );
}
