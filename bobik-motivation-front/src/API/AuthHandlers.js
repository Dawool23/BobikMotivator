import { login, logout, updateTokens } from '../API';
import { saveTokens, clearTokens } from '../AuthService';

export const handleSubmitForm = async (values) => {
    try {
        const response = await login(values.login_reg, values.password_reg);
        if (response.status === 201) {
            saveTokens(response.data.access, response.data.refresh);
        }
    } catch (error) {
        console.error('Ошибка при авторизации:', error);
    }
};

export const handleLogOut = async () => {
    try {
        const response = await logout(localStorage.getItem('refreshToken'));
        if (response.status === 200) {
            clearTokens();
        }
    } catch (error) {
        console.error('Ошибка при выходе:', error);
    }
};

export const handleTokenUpdate = async () => {
    try {
        const response = await updateTokens();
        saveTokens(response.data.access, response.data.refresh);
    } catch (error) {
        console.error('Ошибка при обновлении токенов:', error);
    }
};