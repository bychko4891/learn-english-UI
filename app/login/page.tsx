import {Login} from "@/components/auntification/login/Login";
import {Loading} from "@/app/suspense_fallback/Loading";
import {Suspense} from "react";

export default function LoginPage() {

    return (
        <div className="app-content-area">
            <Suspense fallback={< Loading />}>
                <Login/>
            </Suspense>
        </div>
    );
}