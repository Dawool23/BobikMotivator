import { useContext } from "react";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./FormAuthorization.module.css";
import AuthContext from "../../../context/AuthContext";

const FormAuthorization = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
      let value = e.target.value;
  
      if (value.length > 50) {
        value = value.slice(0, 50);
      }
  
      setUsername(value);
  
      if (value === "") {
        setErrors((prev) => ({ ...prev, username: "Заполните поле" }));
      } else if (!/^[a-zA-Z0-9]{4,}$/.test(value)) {
        setErrors((prev) => ({ ...prev, username: "Логин должен содержать минимум 4 символа, латинские буквы или цифры"}));
      } else {
        setErrors((prev) => ({ ...prev, username: "" }));
      }
    };
  
    const handlePasswordChange = (e) => {
      let value = e.target.value;
    
      if (value.length > 30) {
        value = value.slice(0, 30);
      }
    
      setPassword(value);
    
      if (value === "") {
        setErrors((prev) => ({ ...prev, password: "Заполните поле" }));
      } else {
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
    
  const { loginUser } = useContext(AuthContext);
  const { setIsAuth } = useContext(AuthContext);

/*   const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!username || !password || errors.username || errors.password) {
        console.log("Поля заполнены некорректно:", { username, password, errors });
        setErrors((prev) => ({
            ...prev,
            username: username ? "" : "Заполните поле",
            password: password ? "" : "Заполните поле",
        }));
        return;
    }
  
    console.log("Отправка данных на сервер:", { username, password });
    const success = await loginUser({ username, password });
  
    if (success) {
        console.log("Авторизация успешна, переход на страницу достижений");
        localStorage.setItem('auth', 'true'); 
        setIsAuth(true); 
        navigate("/achievements");
    } else {
        console.error("Ошибка авторизации");
    }
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault();
  
 
    const usernamePattern = /^[a-zA-Z0-9]{4,}$/;
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
  
    const newErrors = {};
  
    if (!username) {
      newErrors.username = "Заполните поле";
    } else if (!usernamePattern.test(username)) {
      newErrors.username = "Логин должен содержать минимум 4 символа, латинские буквы или цифры";
    }
  
    if (!password) {
      newErrors.password = "Заполните поле";
    } else if (!passwordPattern.test(password)) {
      newErrors.password =
        "Пароль должен содержать минимум 8 символов, одну латинскую букву, одну цифру и один специальный символ";
    }
  
    setErrors(newErrors);
  

    if (Object.keys(newErrors).length > 0) {
      return;
    }
  
    console.log("Отправка данных на сервер:", { username, password });
    const success = await loginUser({ username, password });
  
    if (success) {
      console.log("Авторизация успешна, переход на страницу достижений");
      localStorage.setItem("auth", "true");
      setIsAuth(true);
      navigate("/achievements");
    } else {
      setErrors({ ...newErrors, server: "Неправильный логин или пароль!" });
      alert("Неправильный логин или пароль!");
    }
  };
  

    return (
        <div className={styles.container}>
        <form className={styles.form} /* onSubmit={loginUser} */ onSubmit={handleSubmit}>
          <h2 className={styles.headAuthorization}>Авторизация</h2>
          <div className={styles.inputContainer}>
            <input
                type="text"
                name="username"
                placeholder=" "
                onChange={handleUsernameChange}
                className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
                value={username}
            />
            <label htmlFor="username" className={styles.label}>
              Логин
            </label>
            {errors.username && <span className={styles.errorMessage}>{errors.username}</span>}
          </div>
          <div className={styles.inputContainer}>
            <input
                type="password"
                name="password"
                placeholder=" "
                onChange={handlePasswordChange} 
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                value={password}
            />
            <label htmlFor="password" className={styles.label}>
              Пароль
            </label>
            {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
          </div>
          <button type="submit" className={styles.button} /* onClick={handleSubmit} */>
            Войти
          </button>
        </form>
      </div>
    );
};

export default FormAuthorization;