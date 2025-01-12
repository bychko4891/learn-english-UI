// 'use server';

import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";
import Link from "next/link";
import "../auth.styles.css";
import {LoginForm} from "@/components/auntification/login/LoginForm";
import {GoogleButtonSignUp} from "@/components/auntification/google/GoogleButtonSignUp";
import Image from "next/image";


export const Login = () => {
    const breadcrumbNavigation = {
        href: "/login",
        name: "Авторизація"
    }
    return (
        <div className="main-content p-4 w-95">
            <Breadcrumb breadcrumb={breadcrumbNavigation}/>
            <h1 className="text-center mb-3">З поверненням!</h1>
            <div className="d-flex flex-row wrap-login100">

                <div className="login100-form validate-form d-flex flex-column gap-2 mt-lg-5 mt-0">

                    <LoginForm />
                    <p>або</p>
                    <GoogleButtonSignUp />
                    <div className="text-center p-t-12">
                        <Link className="txt2" href="/forgot-password">
                            <span>Забув/ла свій пароль?</span>
                        </Link>
                    </div>

                    <div className="text-center p-t-136 mx-auto">
                        <Link className="txt2 d-flex align-items-center" href="/signup">
                            <span>Створити аккаунт</span>
                            <Image unoptimized className="colored-svg reset-styles ms-2 position-relative" src="/images/arrow.svg"
                                 alt="Create accaunt" width="20" height="20"/>
                        </Link>
                    </div>
                </div>

                <div className="login100-pic js-tilt">
                    <Image unoptimized src="/images/login-img.png" alt="User login" width="316" height="289"/>
                </div>

            </div>
        </div>
    );
};