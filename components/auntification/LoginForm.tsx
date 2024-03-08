'use client'

import React, {FormEvent, useState} from "react";
import {ReactSVG} from "react-svg";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";


type UnauthorizedLoginResponse = {
    status: string;
    fieldName: string;
    fieldMessage: string;
};
export const LoginForm = () => {

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


    // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     const formData = {
    //         email: email,
    //         password: password
    //     }
    //     try {
    //         const response = await sendFormLoginAPI(formData);
    //
    //
    //         if(response)console.log(response?.fieldMessage);
    //         // console.log(response.jwtAccessToken);
    //         // localStorage.setItem("accessJwtToken", response.data.jwtAccessToken);
    //         // console.log(localStorage.getItem('accessJwtToken') + ' localStorage');
    //     } catch (error) {
    //         console.log("Server error: " + error)
    //
    //         // console.error('Error submitting form:');
    //     }
    // }


    return (
        <form onSubmit={handleSubmit} className="class">

            <div className="wrap-input100 input">
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

            <div className="wrap-input100 input" data-validate="Password is required">
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

            <div className="container-login100-form-btn">
                <button type="submit" className="login100-form-btn">Увійти</button>
            </div>

        </form>


    );
}