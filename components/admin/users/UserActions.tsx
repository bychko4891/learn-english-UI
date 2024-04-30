'use client'

import React, { useState } from "react";

import { enableUserAPI } from "@/app/(protected)/admin/users/enableUserAPI";
import { toast, ToastContainer, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type Props = {
    userEnable: boolean;
    userUuid: string;
    userEmail: string
}

export const UserActions = ({ userEnable, userUuid, userEmail}: Props) => {

    const [checked, setChecked] = useState(userEnable);

    const handleChecked = async (checked: boolean) => {
        try {
            const res = await enableUserAPI(checked, userUuid);
            if (res) {
                setChecked(checked);
                // respMessage({status: "success", message: res.general + " для юзера: " + userEmail});
                toast.success(res.general + " для юзера: " + userEmail);
            } else {
                toast.error("Не передбачувана відповідь сервера!");
            }
        } catch (error) {
                toast.error("Помилка сервера!!!");
        }
    };


    return (
        <>

            <ToastContainer containerId={userUuid} autoClose={3000} transition={Zoom} />

            <input
                id={`toggleSwitch-${userUuid}`}
                type="checkbox"
                checked={checked}
                className="toggle-switch"
                name="showDescriptionInPage"
                onChange={(e) => handleChecked(e.target.checked)}
            />
            <label htmlFor={`toggleSwitch-${userUuid}`} className="toggle-switch-label"></label>
        </>
    );
};
// import React, {useEffect, useState} from "react";
// import {toast, ToastContainer, Zoom} from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import {enableUserAPI} from "@/app/(protected)/admin/users/enableUserAPI";
//
// export const UserActions = ({enable, userUuid}: { enable: boolean, userUuid: string }) => {
//
//     const [checked, setChecked] = useState(false);
//     const [userEnable, setUserEnable] = useState(enable);
//
//
//     useEffect(() => {
//         if (checked) {
//             const fetchData = async () => {
//                 try {
//                     const res = await enableUserAPI(userEnable, userUuid);
//                     if (res) {
//                         toast.success(res.general);
//                         setChecked(false);
//                     } else toast.error("Не передбачувана відповідь сервера!");
//                 } catch (error) {
//                     toast.error("Помилка сервера!!!");
//                 } finally {
//                     setChecked(false);
//                 }
//             };
//             fetchData();
//         }
//     }, [userEnable]);
//
//     const handleChecked = (checked: boolean) => {
//         setChecked(true);
//         setUserEnable(checked);
//     }
//
//     return (
//         <>
//             <ToastContainer autoClose={3000} transition={Zoom}/>
//             <input id="toggleSwitch" type="checkbox" checked={userEnable} className="toggle-switch"
//                    name="showDescriptionInPage" onChange={(e) => handleChecked(e.target.checked)}/>
//             <label htmlFor="toggleSwitch" className="toggle-switch-label"></label>
//         </>
//     );
// };