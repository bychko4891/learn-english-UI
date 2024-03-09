'use client'

import {SubmitHandler, useForm} from "react-hook-form"
import React, {ChangeEvent, ChangeEventHandler, FormEventHandler, useState} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactSVG } from "react-svg";
import "./signup.styles.css";


type UnauthorizedLoginResponse = {
    status: string;
    fieldName: string;
    fieldMessage: string;
};

type FormRequestData = {
    name: string;
    email: string;
    password: string;
};
export const SignUpForm = () => {

    const router = useRouter();

    const session = useSession();

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
        watch,
        formState: { errors, isValid },
    } = useForm({
        mode: "onBlur"
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



    const onSubmit: SubmitHandler<FormRequestData> = (data) => {
        console.log(" onSubmit !!! ")
        alert(JSON.stringify(data))
        console.log(data)
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

            <div style={{height: 40, color:"tomato"}}>{errors?.name && <span>{errors.name?.message || "Error!"}</span>}</div>

            <div className="wrap-input100 input">
                <input className="input100" placeholder="Email" {...register("email", {
                    required: "Поле обов'язкове",
                    pattern: {value: /^.+@{1}.+$/, message: "Повинна бути правильно сформована адреса електронної пошти"}

                })} />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                    </span>
                <ReactSVG className="modal__icon" src="/images/email.svg"/>
            </div>

            <div style={{height: 40, color:"tomato"}}>{errors?.email && <span>{errors.email?.message || "Error!"}</span>}</div>

            <div className="wrap-input100 input" data-validate="Password is required">
                <input className="input100" placeholder="Пароль" type="password" {...register("password", {
                    required: "Поле обов'язкове",


                })} onChange={customValidator} />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                    <i className="fa fa-lock" aria-hidden="true"></i>
                </span>
                <ReactSVG className="modal__icon" src="/images/lock-password.svg"/>
            </div>

            <div style={{height: 40, color:"tomato"}}><span>{errors?.password?.message || "e"}</span></div>

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