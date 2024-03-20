import {ForgotPasswordForm} from "@/components/auntification/forgotPassword/ForgotPasswordForm";
import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";

const breadcrumbNavigation = {
    href: "/forgot-password",
    name: "Відновлення пароля"
}
export const ForgotPassword = () => {


    return (
        <div className="main-content p-4 w-95">
            <Breadcrumb breadcrumb={breadcrumbNavigation}/>
            <div className="d-flex flex-column align-items-center">
                <h1>Відновити пароль</h1>
                <div className="col-md-8 col-12">
                    <p>
                        Для відновлення пароля впишіть в поле будь ласка свій email та потім використовуйте вказівки в
                        єлектронному листі,
                        який надійде на пошту, на яку був зареєстрований аккаунт в додатку.
                    </p>
                </div>
                <div className="forgot-password-page-form">

                    <ForgotPasswordForm/>

                </div>
            </div>
        </div>
    );
};