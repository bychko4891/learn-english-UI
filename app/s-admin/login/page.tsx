import {Loading} from "@/app/suspense_fallback/Loading";
import {Suspense} from "react";
import {AdminLoginForm} from "@/components/auntification/login/AdminLoginForm";

export default function LoginPage() {

    return (
        <div className="app-content-area">
            <Suspense fallback={< Loading />}>
                <AdminLoginForm />
            </Suspense>
        </div>
    );
}