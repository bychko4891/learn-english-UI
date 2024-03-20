'use client'

import {toast, ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./style.css"
import TinyMCEEditor from "@/app/TinyMCEEditor";
import {FormEvent, useState} from "react";

export const Edit = () => {


    const [textContent, setTextContent] = useState<string>("");

    const handleContentChange = (newContent: string) => {
        setTextContent(newContent);
    };
    const notify = () => {
        toast.success('Message!');
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert(textContent);
    }

    return (
        <>
            <ToastContainer autoClose={3000} transition={Zoom}/>
            <h1>Edit profile </h1>
            <button className="sc-imWYAI eHElAY" onClick={notify}>
                <span>Click me! </span>
            </button>
            <br/>
            <button className="glow-on-hover" onClick={notify}>
                <span>Click me! </span>
            </button>
            <br/>
            <br/>


            <form onSubmit={handleSubmit}>
                {/*<Editor apiKey="j8dxs8puyiugoamq11vn3bctaonh1jhzvd0cewcb1jiyl2c6" />*/}
                <TinyMCEEditor onContentChange={handleContentChange}/>
                <button type="submit">YES</button>
            </form>

        </>
    );
};