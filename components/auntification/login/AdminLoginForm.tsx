'use client'

import {Breadcrumb} from "@/components/breadcrumb/Breadcrumb";
import Link from "next/link";
import Image from "next/image";
import React, {FormEvent, useState} from "react";
import {ResponseMessages} from "@/app/DefaultResponsesInterfaces";
import "../auth.styles.css";
import {ReactSVG} from "react-svg";
import {sendAdminFormLoginAPI} from "@/app/s-admin/login/sendAdminFormLoginAPI";
import User from "@/user/User";
import {useUser} from "@/app/UserProvider";
import {getAdminAPI} from "@/app/(protected)/admin/admin/getAdminAPI";
import {useRouter} from "next/navigation";

export const AdminLoginForm = () => {
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
                    <div className="text-center p-t-12">
                        <Link className="txt2" href="/forgot-password">
                            <span>Забув/ла свій пароль?</span>
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

const LoginForm = () => {


    const { user: currentUser, updateUser } = useUser();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(false);

    const [respData, setRespData] = useState<ResponseMessages>()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisabled(true);
        const data = {
            email: email,
            password: password
        }
        try {
            const response = await sendAdminFormLoginAPI(data);
            setDisabled(false);
            if(response.status === 200) {
                if(response.ok === "ADMIN") {
                   const admin = await getAdminAPI();
                   if(admin) {
                       updateUser(admin);
                       setTimeout(() => {
                           router.push("/admin");
                       }, 1000);
                   }
                }
            } else if(response.err)setRespData(response.err);

        } catch (error) {
            setDisabled(false);

        }
    }


    return (
        <form onSubmit={handleSubmit} className="class">
            <div className="wrap-input100 input">
                <input className="input100" type="email" name="email" placeholder="Email" value={email}
                       onChange={(e) => setEmail(e.target.value)} required={true} />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                    <i className="fa fa-envelope" aria-hidden="true"></i></span>
                {/*<ReactSVG className="modal__icon" src="/images/email.svg"/>*/}
            </div>
            <div style={{height: 40, color: "tomato"}}>
                {respData?.email && <span>{respData.email}</span>}
            </div>
            <div className="wrap-input100 input" data-validate="Password is required">
                <input className="input100" type="password" name="password" placeholder="Пароль" value={password}
                       onChange={(e) => setPassword(e.target.value)} required={true} />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                    <i className="fa fa-lock" aria-hidden="true"></i>
                </span>
                {/*<ReactSVG className="modal__icon" src="/images/lock-password.svg"/>*/}
            </div>
            <div style={{height: 20, color: "tomato"}}>
                {respData?.password && <span>{respData.password}</span>}
                {respData?.general && <span>{respData.general}</span>}
            </div>
            <div className="container-login100-form-btn">
                <button type="submit" className="login100-form-btn" disabled={disabled}>Увійти</button>
            </div>
        </form>
    );


}