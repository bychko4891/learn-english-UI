"use server";

import React from "react";
import {Edit} from "@/app/(protected)/user/edit/Edit";

export default async function UserEdit() {


    return (
        <>

            <h1>Edit</h1>
            <Edit />
        </>
    );
}