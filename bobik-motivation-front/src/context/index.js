import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(localStorage.getItem('auth'));

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth
        }}>
            {children}
        </AuthContext.Provider>
    );
};