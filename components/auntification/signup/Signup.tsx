'use client'

import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";
import "../auth.styles.css";
import Image from "next/image";
import {SignUpForm} from "@/components/auntification/signup/SignUpForm";
import {useState} from "react";

export const Signup = () => {
    const breadcrumbNavigation = {
        href: "/signup",
        name: "Реєстрація"
    }

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    return (
        <div className="main-content p-4 w-95">
            <Breadcrumb breadcrumb={breadcrumbNavigation}/>
            <h1 className="text-center mb-3">Привіт! Давай створимо твій обліковий запис</h1>
            <div className="d-flex flex-row wrap-signup">

                <div className="login100-form validate-form d-flex flex-column gap-2 mt-lg-5 mt-0">

                    <SignUpForm/>

                </div>

                <div className="login100-pic js-tilt">
                    <Image src="/images/login-img.png" alt="User login" width="316" height="289"/>
                </div>

            </div>
        </div>
    );
};