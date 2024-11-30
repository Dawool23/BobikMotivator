import axios from 'axios';

// Получаем базовый URL API из переменной окружения
const API_URL = process.env.REACT_APP_API_URL;

// Функция для авторизации
export const login = (username, password) => {
    return axios.post(`${API_URL}/login/`, { username, password });
};

// Функция для выхода из системы
export const logout = (refreshToken) => {
    return axios.post(`${API_URL}/logout/`, { refresh_token: refreshToken });
};

// Функция для обновления токенов
export const updateTokens = () => {
    return axios.post(`${API_URL}/token/refresh/`, {
        refresh: localStorage.getItem('refreshToken'),
    });
};

// Запрос с токеном авторизации
export const fetchWithToken = (url) => {
    return axios.get(`${API_URL}${url}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
};
