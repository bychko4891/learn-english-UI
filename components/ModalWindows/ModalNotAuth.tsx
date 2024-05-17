'use client'

import {useEffect} from "react";
import {Modal, Button} from "react-bootstrap";
import Link from "next/link";

type Props = {
    show: boolean;
    handleClose: () => void;
}


export const ModalNotAuth = ({ show, handleClose } : Props) => {

    useEffect(() => {
        typeof document !== undefined
            ? require('bootstrap/dist/js/bootstrap.bundle.min.js')
            : null;
    }, []);

    return (
        <>


            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Необхідна авторизація!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Нажаль навчання в додатку дуступне тільки для аунтифікованих користувачів, бо деякі функції потребують збереження.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрити
                    </Button>
                    <Link href="/login" className="modal-auth-link">Авторизуватися</Link>
                    {/*<Button variant="primary" onClick={handleClose}>*/}
                    {/*    Save Changes*/}
                    {/*</Button>*/}
                </Modal.Footer>
            </Modal>
        </>
    );
};
