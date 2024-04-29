'use client'

import React, {useEffect, useState} from "react";
import {Pagination} from "@/app/DefaultResponsesInterfaces";
import {DeleteJwtAccessToken} from "@/app/(protected)/jwtSessionService/DeleteJwtAccessToken";
import {PaginationComponent} from "@/components/pagination/PaginationComponent";
import {NoContent} from "@/components/noContent/NoContent";
import {getUsersAPI} from "@/app/(protected)/admin/users/getUsersAPI";
import User from "@/user/User";
import {UserActions} from "@/components/admin/users/UserActions";
import { toast, ToastContainer, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type ToastMessage = {
    status: string;
    message: string;
}
export const Users = () => {

    const [users, setUsers] = useState<User[]>();
    const [nextPage, setNextPage] = useState<number>(0);
    const [size, setSize] = useState<number>(25);
    const [pagination, setPagination] = useState<Pagination>();
    const [respMessage, setRespMessage] = useState<ToastMessage>();
    const [error, setError] = useState<Error>();



    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getUsersAPI(nextPage, size);
                if (res) {
                    setUsers(res.t);
                    const pagination = {
                        totalPages: res.totalPages,
                        currentPage: res.currentPage,
                        totalElements: res.totalElements
                    } as Pagination;
                    setPagination(pagination);
                } else setError(new Error);
            } catch (error) {
                setError(new Error);
            }
        };
        fetchData();
    }, [error, nextPage, size]);

    useEffect(() => {
        if(respMessage?.status === "success") {
            toast.success(respMessage.message);
        } else {
            toast.error(respMessage?.message);
        }
    }, [respMessage]);

    if (!error) {
        return (
            <>
                <ToastContainer autoClose={3000} transition={Zoom} />
                <table className="table mt-3">
                    <thead className="table-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Email</th>
                        <th scope="col">Дата реєстрації</th>
                        <th scope="col">Останній візит</th>
                        <th scope="col">IP</th>
                        <th scope="col">Аватар</th>
                        <th scope="col">Верифікований</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users && users.length > 0 && users.map((user) => (
                        <tr key={user.uuid}>
                            <th scope="row">{user.id}</th>
                            <td>{user.email}</td>
                            <td>{user.dateOfCreated}</td>
                            <td>{user.lastVisit}</td>
                            <td>{user.userIp}</td>
                            <td>{user.userAvatar.imageName}</td>
                            <td>
                                <UserActions key={user.uuid} userEnable={user.enable} userUuid={user.uuid} userEmail={user.email} respMessage={setRespMessage}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {pagination && <PaginationComponent pagination={pagination} nextPage={setNextPage} size={setSize}/>}
            </>
        );
    }
    return (
        <>
            <NoContent/>
            <DeleteJwtAccessToken/>
        </>
    );
};