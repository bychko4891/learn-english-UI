'use client'

import React, { createContext, ReactNode, useContext, useState } from 'react';
import User from '@/user/User';

// Визначте тип для об'єкта користувача
type UserContextType = {
    user: User | null; // Замість User може бути будь-який тип вашого користувача
    updateUser: (userData: User) => void;
};

// Створення контексту для користувача з визначеним типом
const UserContext = createContext<UserContextType>({
    user: null,
    updateUser: () => {},
});

// Створення глобального провайдера для користувача
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null); // Початковий стан користувача

    const updateUser = (userData: User) => {
        setUser(userData);
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Хук для отримання даних користувача в компонентах
export const useUser = () => useContext(UserContext);