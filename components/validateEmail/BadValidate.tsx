'use client'

export type ResponseMessage = {
    general: string;
}

export const BadValidate = ({message}: { message: ResponseMessage }) => {


    return (
        <div className="app-content-area">
            <div className="main-content p-3 w-95">
                <h1>{message.general}</h1>
            </div>
        </div>
    );
};