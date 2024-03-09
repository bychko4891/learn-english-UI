'use client'

import {SubmitHandler, useForm} from "react-hook-form"
import React, {ChangeEvent, useState} from "react";
import {ReactSVG} from "react-svg";
import "./signup.styles.css";
import {DataSendSignUp, sendSignUpAPI} from "@/app/signup/sendSignUpAPI";


export const SignUpForm = () => {

    const [signupNameError, setNameError] = useState("");
    const [signupEmailError, setEmailError] = useState("");
    const [signupPasswordError, setPasswordError] = useState("");

    const [lover, setLover] = useState('');
    const [upper, setUpper] = useState('');
    const [number, setNumber] = useState('');
    const [special, setSpecial] = useState('');
    const [length, setLength] = useState('');
    const lowerReg = new RegExp('(?=.*[a-z])');
    const upperReg = new RegExp('(?=.*[A-Z])');
    const numberReg = new RegExp('(?=.*[0-9])');
    const specialReg = new RegExp('(?=.*[!@#\$%\^&\*])');
    const lengthReg = new RegExp('(?=.{6,})');

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const customValidator = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;
        if(lowerReg.test(inputValue)) {
            setLover('valid');
        } else {
            setLover('');
        }
        if(upperReg.test(inputValue)) {
            setUpper('valid');
        } else {
            setUpper('');
        }
        if(numberReg.test(inputValue)) {
            setNumber('valid');
        } else {
            setNumber('');
        }
        if(specialReg.test(inputValue)) {
            setSpecial('valid');
        } else {
            setSpecial('');
        }
        if(lengthReg.test(inputValue)) {
            setLength('valid');
        } else {
            setLength('');
        }
    };

    const onSubmit: SubmitHandler<DataSendSignUp> = async (data) => {

        const res = await sendSignUpAPI(data);

        setNameError(res?.name || "");
        setEmailError(res?.email || "");
        setPasswordError(res?.password || "");
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="class">

            <div className="wrap-input100 input">
                <input className="input100" placeholder="Ім'я" {...register("name", {
                    required: "Поле обов'язкове",
                    minLength: {value: 3, message: "Мінімальна довжина поля 3 символи"},
                    maxLength: {value: 50, message: "Максимальна довжина поля 50 символів"}
                })} />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
                <ReactSVG className="modal__icon" src="/images/user.svg"/>
            </div>

            <div style={{height: 40, color: "tomato"}}>
                {errors?.name && <span>{errors.name?.message?.toString()}</span>}
                <span>{signupNameError}</span>
            </div>

            <div className="wrap-input100 input">
                <input className="input100" placeholder="Email" {...register("email", {
                    required: "Поле обов'язкове",
                    pattern: {
                        value: /^.+@{1}.+$/,
                        message: "Повинна бути правильно сформована адреса електронної пошти"
                    },
                    maxLength: {value: 50, message: "Максимальна довжина поля 50 символів"}

                })} />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                    </span>
                <ReactSVG className="modal__icon" src="/images/email.svg"/>
            </div>

            <div style={{height: 40, color: "tomato"}}>
                {errors?.email && <span>{errors.email?.message?.toString()}</span>}
                <span>{signupEmailError}</span>
            </div>

            <div className="wrap-input100 input" data-validate="Password is required">
                <input className="input100" placeholder="Пароль" type="password" {...register("password", {
                    required: "Поле обов'язкове",
                    minLength: {value: 6, message: "Мінімальна довжина поля 6 символів"},
                    maxLength: {value: 50, message: "Максимальна довжина поля 50 символів"}
                })} onChange={customValidator}/>

                <span className="focus-input100"></span>
                <span className="symbol-input100">
                    <i className="fa fa-lock" aria-hidden="true"></i>
                </span>
                <ReactSVG className="modal__icon" src="/images/lock-password.svg"/>
            </div>

            <div style={{height: 40, color: "tomato"}}>
                <span>{errors?.password?.message?.toString()}</span>
                <span>{signupPasswordError}</span>
            </div>

            <div className="validation">
                <ul>
                    <li className={lover}>
                        <span>Мінімум один символ у нижньому регістрі</span>
                    </li>
                    <li className={upper}>
                        <span>Мінімум один символ верхнього регістру</span>
                    </li>
                    <li className={number}>
                        <span>Мінімум одна цифра</span>
                    </li>
                    <li className={special}>
                        <span>Мінімум один спеціальний символ</span>
                    </li>
                    <li className={length}>
                        <span>Довжина - щонайменше 6 символів</span>
                    </li>
                </ul>
            </div>

            <div className="container-login100-form-btn">
                <button disabled={!isValid} type="submit" className="login100-form-btn">Зареєструватися</button>
            </div>

        </form>

    );
}