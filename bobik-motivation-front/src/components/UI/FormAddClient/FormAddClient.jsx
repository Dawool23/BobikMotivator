import React, { useState } from 'react';
import axios from 'axios';
import styles from './FormAddClient.module.css'; // Импортируем стили

const FormAddClient = () => {
    const [formData, setFormData] = useState({
        fullName: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверка на заполненность всех полей
        if (!formData.fullName) {
            setError('Все поля должны быть заполнены');
            return;
        }

        try {
            const response = await axios.post('Ваш_URL_для_сервера', formData);
            if (response.status === 201) {
                alert('Клиент успешно добавлен!');
                setFormData({ fullName: '', email: '', phone: '' });
                setError('');
            }
        } catch (error) {
            console.error('Ошибка при добавлении клиента:', error);
            setError('Не удалось добавить клиента. Проверьте данные и попробуйте снова.');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Добавить клиента</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <label className={styles.label}>ФИО:</label>
                    <input
                        className={styles.input}
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Введите ФИО"
                    />
                </div>
                <button className={styles.button} type="submit">Добавить</button>
            </form>
        </div>
    );
};

export default FormAddClient;