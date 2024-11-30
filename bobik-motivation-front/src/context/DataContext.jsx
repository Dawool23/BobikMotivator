import React, { createContext, useState, useEffect } from 'react';
import PostService from '../API/PostService';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <DataContext.Provider value={{
            isLoggedIn
        }}>
            {children}
        </DataContext.Provider>
    );
};
        