'use client'

import React, {FormEvent, useState} from "react";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {ReactSVG} from "react-svg";
import "./signup.styles.css";


type UnauthorizedLoginResponse = {
    status: string;
    fieldName: string;
    fieldMessage: string;
};
export const SignUpForm = () => {

    const session = useSession();
    console.log(session.data +  ' session !!!!!!!!!!!')

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const response = await signIn('credentials',
            {
                email: formData.get('email'),
                password: formData.get('password'),
                redirect: false
            });

        if (response && !response.error) {
            console.log(response.status + ' if !!!!!');
            router.push('/about');

        } else if(response && response.error){
            console.log(response.error + ' else !!!1');
        }
    };


    return (
        <form onSubmit={handleSubmit} className="class">

            <div className="wrap-input100 input m-30-0">
                <input className="input100" type="text" name="name" placeholder="Ім'я"/>
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                    </span>
                <ReactSVG className="modal__icon" src="/images/user.svg"/>
            </div>

            <div className="wrap-input100 input m-30-0">
                {/*<input className="input100" type="text" name="email" placeholder="Email" value={formData.email} onChange={emailChangeHandler}/>*/}
                <input className="input100" type="email" name="email" placeholder="Email"/>

                {/*<input className="input100" type="email" name="email" placeholder="Email" value={email}*/}
                {/*       onChange={(e) => setEmail(e.target.value)} required={true} />*/}
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                    </span>
                <ReactSVG className="modal__icon" src="/images/email.svg"/>
            </div>

            <div className="wrap-input100 input m-30-0" data-validate="Password is required">
                <input className="input100" type="password" name="password" placeholder="Пароль"/>
                {/*<input className="input100" type="password" name="password" placeholder="Пароль" value={password}*/}
                {/*       onChange={(e) => setPassword(e.target.value)}/>*/}
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                        <i className="fa fa-lock" aria-hidden="true"></i>
                    </span>
                <ReactSVG className="modal__icon" src="/images/lock-password.svg"/>
            </div>

            {/*{error && <div className="error-email text-center">{error}</div>}*/}
            <div className="validation">
                <ul>
                    <li id="lover">
                        <ReactSVG className="circle-icon" src="/images/circle.svg"/>
                        <span>Мінімум один символ у нижньому регістрі</span>
                    </li>
                    <li id="upper">
                        <ReactSVG className="circle-icon" src="/images/circle.svg"/>
                        <span>Мінімум один символ верхнього регістру</span>
                    </li>
                    <li id="number">
                        <ReactSVG className="circle-icon" src="/images/circle.svg"/>
                        <span>Мінімум одна цифра</span>
                    </li>
                    <li id="special">
                        <ReactSVG className="circle-icon" src="/images/circle.svg"/>
                        <span>Мінімум один спеціальний символ</span>
                    </li>
                    <li id="length">
                        <ReactSVG className="circle-icon" src="/images/circle.svg"/>
                        <span>Довжина - щонайменше 8 символів</span>
                    </li>
                </ul>
            </div>


            <div className="container-login100-form-btn">
                <button type="submit" className="login100-form-btn">Зареєструватися</button>
            </div>

        </form>


    );
}