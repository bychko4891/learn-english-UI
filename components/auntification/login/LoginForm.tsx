'use client'

import React, {FormEvent, useState} from "react";
import {ReactSVG} from "react-svg";
import {sendFormLoginAPI, UnauthorizedLoginResponse} from "@/app/login/sendFormLoginAPI";

export const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(false);

    const [respData, setRespData] = useState<UnauthorizedLoginResponse>()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisabled(true);
        const data = {
            email: email,
            password: password
        }
        try {
            const response = await sendFormLoginAPI(data);
            setDisabled(false);
            if(response) {
                setRespData(response);
            }
        } catch (error) {
            setDisabled(false);
            console.log("Server error: " + error)

        }
    }

    return (
        <form onSubmit={handleSubmit} className="class">

            <div className="wrap-input100 input">
                <input className="input100" type="email" name="email" placeholder="Email" value={email}
                       onChange={(e) => setEmail(e.target.value)} required={true} />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
                <ReactSVG className="modal__icon" src="/images/email.svg"/>
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
                <ReactSVG className="modal__icon" src="/images/lock-password.svg"/>
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