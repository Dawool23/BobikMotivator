import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Базовая конфигурация axios
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Базовый URL из .env
    headers: {
      'Content-Type': 'application/json',
    },
  });

// Функция для выполнения POST-запроса на логин
 export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при авторизации:", error);
    throw error;
  }
}; 


// Универсальная функция для выполнения запросов
 export const fetchData = async (endpoint, authToken) => {
    try {
      const response = await apiClient.get(endpoint, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Ошибка при загрузке данных с ${endpoint}:`, error);
      throw error;
    }
  }; 
  
