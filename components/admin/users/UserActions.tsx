'use client'

import React, {useState} from "react";

export const UserActions = ({enable}: {enable: boolean }) => {

    const [userEnable, setUserEnable] = useState(enable);

    return (
        <>
            {/*<div className="d-flex flex-row w-100 align-items-center">*/}
            {/*    <span className="me-auto">Опубліковано (так\ні):</span>*/}
                <input id="toggleSwitch" type="checkbox" checked={enable} className="toggle-switch"
                       name="showDescriptionInPage"
                       onChange={(e) => setUserEnable(e.target.checked)}/>
                <label htmlFor="toggleSwitch" className="toggle-switch-label"></label>
            {/*</div>*/}
        </>
    );
};