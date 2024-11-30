/* import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState(null);
    let [user, setUser] = useState(null);

    let loginUser = async (e ) => {
        e.preventDefault()
        let response = await fetch(process.env.REACT_APP_API_URL + '/api/login', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        let data = await response.json()
        console.log('data', data);

        if(response.status === 200) {
            setAuthTokens()
            setUser(data.access)
        }else{
            alert('Что-то пошло не так(')
        }


    }

    let contextData = {
        loginUser:loginUser
    }

  return (
    <AuthContext.Provider value={contextData} >
        {children}
    </AuthContext.Provider>
  )
} 
 */

  
  import React from 'react'
  import { useState } from 'react';
  import { createContext } from 'react'

  const AuthContext = createContext()

  export default AuthContext;

  export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(null);
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
        <AuthContext.Provider value={{ isAuth, loginUser, setIsAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
