import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL; // Получаем URL из переменной окружения

export const login = (username, password) => {
    return axios.post(`${API_URL}/login/`, { username, password });
};

export const logout = (refreshToken) => {
    return axios.post(`${API_URL}/logout/`, { refresh_token: refreshToken });
};

export const updateTokens = () => {
    return axios.post(`${API_URL}/token/refresh/`, {
        refresh: localStorage.getItem('refreshToken'),
    });
};

export const fetchWithToken = (url) => {
    return axios.get(`${API_URL}${url}`, {
        headers: {
            Authorization: Bearer `${localStorage.getItem('accessToken')}`,
        },
    });
};