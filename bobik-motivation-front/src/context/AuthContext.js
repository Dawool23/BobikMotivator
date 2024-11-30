/*   import React from 'react'
  import { useState } from 'react';
  import { createContext } from 'react'

  const AuthContext = createContext()

  export default AuthContext;

  export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(
        JSON.parse(localStorage.getItem('authTokens')) || null
      );
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(localStorage.getItem('auth') === 'true');

    const loginUser = async ({ username, password }) => {
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/api/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.status === 200) {
                setAuthTokens(data);
                setUser(data.access);
                localStorage.setItem("authTokens", JSON.stringify(data));
                return true; 
            } else {
                alert("Неправильный логин или пароль!");
                return false; 
            }
        } catch (error) {
            console.error("Ошибка авторизации:", error);
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ isAuth, authTokens, loginUser, setIsAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
 */
import React, { createContext, useState } from 'react';
/* import { loginUser as apiLoginUser } from './api'; // импортируем функцию loginUser из api.js */
import { loginUser as apiLoginUser } from '../API/API';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(
    JSON.parse(localStorage.getItem('authTokens')) || null
  );
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(localStorage.getItem('auth') === 'true');

  const loginUser = async ({ username, password }) => {
    try {
      const data = await apiLoginUser(username, password); // Используем функцию из api.js

      if (data && data.access) {
        setAuthTokens(data);
        setUser(data.access);
        localStorage.setItem("authTokens", JSON.stringify(data));
        setIsAuth(true);
        return true; // Успешный вход
      } else {
        alert("Неправильный логин или пароль!");
        return false; // Ошибка входа
      }
    } catch (error) {
      console.error("Ошибка авторизации:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuth, authTokens, user, loginUser, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
