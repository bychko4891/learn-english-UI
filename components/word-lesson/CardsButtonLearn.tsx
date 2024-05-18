'use client'

import {useUser} from "@/app/UserProvider";
import {ModalNotAuth} from "@/components/ModalWindows/ModalNotAuth";
import {useState} from "react";
import Link from "next/link";

export const CardsButtonLearn = () => {

    const {user} = useUser();
    const [show, setShow] = useState(false);

    if (user) {
        return (
            <div className="mt-4-1">
                <Link href="/word-lesson/" className="wl-b-start-learn">Почати навчання</Link>
            </div>
        );
    } else {


        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        return (
            <div className="mt-4">
                <button onClick={handleShow} className=" wl-b-start-learn">
                    Почати навчання
                </button>

                <ModalNotAuth show={show} handleClose={handleClose}/>
            </div>

        );
    }

};