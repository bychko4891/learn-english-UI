import {Loading} from "@/app/suspense_fallback/Loading";
import {Suspense} from "react";
import {UserAuth} from "@/components/user/UserAuth";

export default function LoginPage() {

    return (
        <div className="app-content-area">
            <Suspense fallback={< Loading />}>
                <UserAuth/>
            </Suspense>
        </div>
    );
}