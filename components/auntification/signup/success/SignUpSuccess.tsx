import "./success.signup.style.css";
import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";

export const SignUpSuccess = () => {

    const breadcrumbNavigation = {
        href: "/signup/success",
        name: "Успішна реєстрація"
    }
    return (
        <div className="main-content p-4 w-95">
            <Breadcrumb breadcrumb={breadcrumbNavigation} />
            <div className="success__signup d-flex flex-column align-items-center">
                <h1>Реєстрація успішна!</h1>
                <div className="images" ></div>
                <p>На вашу електронну адресу було надіслано листа з подальшими діями.</p>
                <p>Лист надійде на пошту на протязі 10-15 хвилин.</p>
                <p>Якщо лист не надійшов, перевірте будь ласка в директорії «Спам».</p>
            </div>
        </div>
    );
};