import {Loading} from "@/app/suspense_fallback/Loading";
import {Suspense} from "react";
import {UserGoogleAuth} from "@/components/user/UserGoogleAuth";

export default function LoginPage() {

    return (
        <div className="app-content-area">
            <Suspense fallback={< Loading />}>
                <UserGoogleAuth/>
            </Suspense>
        </div>
    );
}