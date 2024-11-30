import { useContext } from "react";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../context";
import styles from "./FormAuthorization.module.css";

const FormAuthorization = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isUsernameFilled, setUsernameFilled] = useState(false);
    const [isPasswordFilled, setPasswordFilled] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
      let value = e.target.value;
  
      // Ограничение на 50 символов
      if (value.length > 50) {
        value = value.slice(0, 50);
      }
  
      setUsername(value);
      setUsernameFilled(value !== "");
  
      if (value === "") {
        setErrors((prev) => ({ ...prev, userName: "Заполните поле" }));
      } else if (!/^[a-zA-Z0-9]{4,}$/.test(value)) {
        setErrors((prev) => ({ ...prev, userName: "Логин должен содержать минимум 4 символа, латинские буквы или цифры"}));
      } else {
        setErrors((prev) => ({ ...prev, userName: "" }));
      }
    };
  
    const handlePasswordChange = (e) => {
      let value = e.target.value;
    
      // Ограничение на 20 символов
      if (value.length > 20) {
        value = value.slice(0, 20);
      }
    
      setPassword(value);
      setPasswordFilled(value !== "");
    
      if (value === "") {
        setErrors((prev) => ({ ...prev, password: "Заполните поле" }));
      } else {
        // Регулярное выражение для пароля с любыми спецсимволами
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
        if (!passwordPattern.test(value)) {
          setErrors((prev) => ({
            ...prev,
            password: "Пароль должен содержать минимум 8 символов, одну латинскую букву, одну цифру и один специальный символ",
          }));
        } else {
          setErrors((prev) => ({ ...prev, password: "" }));
        }
      }
    };
    
    const checkUsernameInDatabase = async (username) => {
      try {
        const response = await fetch(`/api/check-username?username=${username}`);
        const data = await response.json();
        return data.exists; 
      } catch (error) {
        console.error("Ошибка проверки логина:", error);
        return false; 
      }
    };
  
  //   const checkUsernameInDatabase = async (username) => {
  //     try {
  //         const response = await PostService.fetchData(`check-username?username=${username}`);
  //         return response.exists; // Предполагается, что сервер возвращает { exists: true/false }
  //     } catch (error) {
  //         console.error("Ошибка проверки логина:", error);
  //         return false; // Вернуть false в случае ошибки
  //     }
  //   };
  
    const handleSubmit = async (e) => { 
      e.preventDefault();
      const newErrors = {};
    
      // Проверка на заполненность и формат логина
      if (!isUsernameFilled) {
        newErrors.userName = "Заполните поле";
      } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
        newErrors.userName = "Логин должен содержать минимум 4 символа, латинские буквы или цифры";
      }
    
      // Проверка на заполненность пароля
      if (!isPasswordFilled) {
        newErrors.password = "Заполните поле";
      } else {
        // Регулярное выражение для проверки пароля
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
        if (!passwordPattern.test(password)) {
          newErrors.password = "Пароль должен содержать минимум 8 символов, одну латинскую букву, одну цифру и один специальный символ";
        }
      }
  
   // Проверка существования логина в базе данных
      // if (Object.keys(newErrors).length === 0) {
      //   const usernameExists = await checkUsernameInDatabase(username);
      //   if (!usernameExists) {
      //     newErrors.userName = "Логин не найден";
      //   }
      // }
    
      // Установка ошибок, если они есть
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        navigate('/personalpage');
      }
    };



    return (
        <div className={styles.container}>
        <form className={styles.form} onSubmit={login}>
          <h2 className={styles.headAuthorization}>Авторизация</h2>
          <div className={styles.inputContainer}>
            <input
                type="text"
                name="userName"
                placeholder=" "
                onChange={handleUsernameChange}
                className={styles.input}
                value={username}
            />
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            {errors.userName && <span className={styles.errorMessage}>{errors.userName}</span>}
          </div>
          <div className={styles.inputContainer}>
            <input
                type="password"
                name="password"
                placeholder=" "
                onChange={handlePasswordChange} 
                className={styles.input}
                value={password}
            />
            <label htmlFor="password" className={styles.label}>
              Пароль
            </label>
            {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
          </div>
          <button type="submit" className={styles.button}>
            Войти
          </button>
        </form>
      



{/*         <form className={styles.form} onSubmit={login}>
          <h2 className="head-authorization">Авторизация</h2>
          
          <div className="input-container username-container">
            <input
              type="text"
              name="userName"
              placeholder=" "
              onChange={handleUsernameChange}
              className={`username-input ${errors.userName ? 'error' : ''} ${isUsernameFilled ? 'filled' : ''}`}
              value={username}
            />
            <label className={`label ${isUsernameFilled || errors.userName ? 'filled' : ''} ${errors.userName ? 'error' : ''}`}>Логин</label>
            {errors.userName && <span className="errorMessage">{errors.userName}</span>}
          </div>
  
          <div className="input-container password-container">
            <input
              type="password"
              name="password"
              placeholder=" "
              onChange={handlePasswordChange} 
              className={`password-input ${errors.password ? 'error' : ''} ${isPasswordFilled ? 'filled' : ''}`}
              value={password}
            />
            <label className={`label ${isPasswordFilled || errors.password ? 'filled' : ''} ${errors.password ? 'error' : ''}`}>Пароль</label>
            {errors.password && <span className="errorMessage">{errors.password}</span>}
          </div>
  
          <div className="buttonContainerSide">
            <button onClick={handleSubmit}>
              Войти
            </button>
          </div>
        </form> */}
      </div>
    );
};

export default FormAuthorization;