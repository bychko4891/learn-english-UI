'use client'

import {ReactNode, useContext, useEffect, useState} from "react";
import User from "@/user/User";
import { createContext } from "react";

type UserContextType = {
    user: User | null;
    updateUser: (userData: User | null) => void;
};

const UserContext = createContext<UserContextType>({
    user: null,
    updateUser: () => {},
});
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const updateUser = (userData: User | null) => {
        setUser(userData);
        if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
        } else {
            localStorage.removeItem('user');
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
// 'use client'
//
// import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
// import User from '@/user/User';
//
// type UserContextType = {
//     user: User | null;
//     updateUser: (userData: User | null) => void;
// };
//
// const UserContext = createContext<UserContextType>({
//     user: null,
//     updateUser: () => {},
// });
//
// export const UserProvider = ({ children }: { children: ReactNode }) => {
//     const [user, setUser] = useState<User | null>(() => {
//         // Початкове значення беремо з localStorage
//         const storedUser = localStorage.getItem('user');
//         return storedUser ? JSON.parse(storedUser) : null;
//     });
//
//     const updateUser = (userData: User | null) => {
//         // Оновлення стану користувача
//         setUser(userData);
//         // Збереження в localStorage
//         if (userData) {
//             localStorage.setItem('user', JSON.stringify(userData));
//         } else {
//             localStorage.removeItem('user');
//         }
//     };
//
//     // Очистка localStorage при виході з додатку
//     // useEffect(() => {
//     //     const handleUnload = () => {
//     //         localStorage.removeItem('user');
//     //     };
//     //
//     //     window.addEventListener('unload', handleUnload);
//     //
//     //     return () => {
//     //         window.removeEventListener('unload', handleUnload);
//     //     };
//     // }, []);
//
//     return (
//         <UserContext.Provider value={{ user, updateUser }}>
//             {children}
//         </UserContext.Provider>
//     );
// };
//
// export const useUser = () => useContext(UserContext);