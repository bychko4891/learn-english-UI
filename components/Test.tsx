'use client'


import {useEffect, useState} from "react";


type BadResp = {
    fieldName: string;
    fieldMessage: string;
}
export const  Test = ({uuid} : { uuid: string }) => {

    const [resp, setResp] = useState({
        fieldName: "",
        fieldMessage: ""
    });

    useEffect(() => {
        const validateEmail = async () => {
            try {
                // Виконуємо запит до нашого API маршруту
                const response = await fetch('http://localhost:3000/api/validate-email', {
                    method: "GET",
                    headers: {
                        "uuid": uuid
                    }

                });

                if (response.status === 400)  {
                    const res = (await response.json()) as  BadResp;
                    setResp(res);
                    console.error("Failed to validate email")

                } else {
                    const res = (await response.json()) as  BadResp;
                    setResp(res);
                    console.log("Email validated successfully");
                }
            } catch (error) {
                // console.error("Error validating email:", error);
            }
        };

        validateEmail();
    }, []);

    return (
        <div>
            <h1>Validating Email</h1>
            <p>UUID: {uuid}</p>
            <h1>{resp.fieldMessage}</h1>
        </div>
    );
};