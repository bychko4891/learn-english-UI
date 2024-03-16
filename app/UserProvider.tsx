'use client'

import React, { createContext, ReactNode, useContext, useState } from 'react';
import User from '@/user/User';

type UserContextType = {
    user: User | null;
    updateUser: (userData: User | null) => void;
};

const UserContext = createContext<UserContextType>({
    user: null,
    updateUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null); // Початковий стан користувача

    const updateUser = (userData: User | null) => {
        setUser(userData);
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);