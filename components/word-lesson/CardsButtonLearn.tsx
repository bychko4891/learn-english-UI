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
            <>
                <Link href="/word-lesson/" className="mt-4 wl-b-start-learn">Почати навчання</Link>
            </>
        );
    } else {


        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        return (
            <div>
                <button onClick={handleShow} className="mt-4 wl-b-start-learn">
                    Почати навчання
                </button>

                <ModalNotAuth show={show} handleClose={handleClose}/>
            </div>

        );
    }

};