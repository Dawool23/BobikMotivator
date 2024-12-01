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



/* import React, { createContext, useState } from 'react';
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
      const data = await apiLoginUser(username, password); 
      console.log("Ответ API:", data);

      if (data && data.access) {
        setAuthTokens(data);
        setUser(data.access);
        localStorage.setItem("authTokens", JSON.stringify(data));
        setIsAuth(true);
        return true; 
      } else {
        return false; 
      }
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuth, authTokens, user, loginUser, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
 */

import React, { createContext, useState } from 'react';
import { loginUser as apiLoginUser } from '../API/API';
import { jwtDecode } from 'jwt-decode';

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
      const data = await apiLoginUser(username, password);
      console.log("Ответ API:", data);

      if (data && data.access) {
        setAuthTokens(data);

        // Декодируем токен и устанавливаем данные пользователя
        const decodedUser = jwtDecode(data.access);
        console.log("Декодированные данные пользователя:", decodedUser); // Логирование данных
        setUser(decodedUser);  // Устанавливаем данные пользователя

        localStorage.setItem("authTokens", JSON.stringify(data));
        setIsAuth(true);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Ошибка при авторизации", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuth, authTokens, user, loginUser, setIsAuth, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};


