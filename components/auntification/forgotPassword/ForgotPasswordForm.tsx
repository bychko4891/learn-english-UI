'use client'

import 'react-toastify/dist/ReactToastify.css';
import "./style.css";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {ReactSVG} from "react-svg";
import {SendFormForgotPasswordAPI} from "@/app/forgot-password/SendFormForgotPasswordAPI";
import {toast, ToastContainer, Zoom} from "react-toastify";


export const ForgotPasswordForm = () => {

    const [email, setEmail] = useState("");
    const [sum, setSum] = useState<number | ''>('');
    const [disabled, setDisabled] = useState(true);
    const [errorCaptcha, setErrorCaptcha] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [notFoundMessage, setNotFoundMessage] = useState("");
    const [badRequestMessage, setBadRequestMessage] = useState("");

    const [numbers, setNumbers] = useState({
        number1: Math.floor(Math.random() * 100) + 1,
        number2: Math.floor(Math.random() * 9) + 1
    });
    const reloadCaptcha = () => {
        setNumbers({
            number1: Math.floor(Math.random() * 100) + 1,
            number2: Math.floor(Math.random() * 9) + 1
        });
    }
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    useEffect(() => {
        isButtonDisabled();
    }, [email, sum]);


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSum(e.target.value as number | '');
    };

    const isButtonDisabled = () => {
        if (!!sum && !!email) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisabled(true);
        const sumNumbers = numbers.number1 + numbers.number2;
        const userSum = +sum;

        if (!isNaN(userSum) && userSum === sumNumbers) {
            setErrorCaptcha("");
            const data = {
                email: email,
            }
            try {
                const response = await SendFormForgotPasswordAPI(data);
                setDisabled(false);
                if(response) {
                    if (response.status === 200) {
                        setSuccessMessage(response.general);
                        toast.success(response.general);
                    }
                    if (response.status === 400) {
                        setSuccessMessage(response.general);
                        toast.success(response.general);
                    }
                    if (response.status === 404) {
                        setNotFoundMessage(response.general);
                        toast.error(response.general);
                    }
                }
                toast.error("Щось зламалось і запит не пройшов! Зверніться до адміністратора будь ласка.");
            } catch (error) {
                toast.error("Помилка на сервері!");
                // console.log("Server error (Forgot password): " + error)

            } finally {
                setDisabled(false);
            }
        } else {
            setDisabled(false);
            setErrorCaptcha("Не вірно порахована сума чисел!");
        }
    }

    return (
        <>
            <ToastContainer autoClose={3000} transition={Zoom}/>
            {domLoaded && (


                <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>

                    <div className="wrap-input100 input">
                        <input className="input100" type="email" name="email" placeholder="Email" value={email}
                               onChange={(e) => setEmail(e.target.value)} required={true}/>
                        <span className="focus-input100"></span>
                        <ReactSVG className="modal__icon" src="/images/email.svg"/>
                    </div>
                    <div style={{height: 20, color: "tomato", fontSize: 20, marginBottom: 10}}>
                        {!!badRequestMessage && <span>{badRequestMessage}</span>}
                        {!!notFoundMessage && <span>{notFoundMessage}</span>}
                    </div>

                    <div className="d-flex flex-column align-items-center">
                        <div className="col-md-6 row">
                            <div className="row captcha-block">
                                <div className="captcha">{numbers.number1}</div>
                                <div className="captcha">+</div>
                                <div className="captcha">{numbers.number2}</div>
                            </div>

                            <button type="button" className="button-reload" onClick={reloadCaptcha}>
                                <ReactSVG src="/images/update.svg"/>
                            </button>
                        </div>
                    </div>
                    <div style={{height: 30, color: "tomato", fontSize: 20, marginBottom: 10}}>
                        {!!errorCaptcha && <span>{errorCaptcha}</span>}
                    </div>
                    <div className="wrap-input100 input" style={{marginBottom: 40}}>
                        <input className="input100" type="number" name="sum" placeholder="Сумма двох чисел" value={sum}
                               min="0" max="200"
                               onChange={handleInputChange} required/>
                        <span className="focus-input100"></span>
                        <ReactSVG className="modal__icon" src="/images/sum.svg"/>
                    </div>

                    <button className="custom-btn" type="submit" disabled={disabled}>Відновити</button>
                    <div style={{height: 20, color: "green", fontSize: 20, marginBottom: 10}}>
                        {!!successMessage && <span>{successMessage}</span>}
                    </div>
                </form>

            )}
        </>
    );
};