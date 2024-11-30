import React, { useState } from 'react';
import axios from 'axios';
import styles from './FormCreateDeal.module.css'; // Импортируем стили

const FormCreateDeal = () => {
    const [formData, setFormData] = useState({
        product: '',
        client: '',
        date: '',
        paymentType: '',
        amount: '',
        status: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверка на заполненность всех полей
        if (!formData.product || !formData.client || !formData.date || !formData.paymentType || !formData.amount || !formData.status) {
            setError('Все поля должны быть заполнены');
            return;
        }

        try {
            const response = await axios.post('Ваш_URL_для_сервера', formData);
            if (response.status === 201) {
                alert('Сделка успешно создана!');
                setFormData({
                    product: '',
                    client: '',
                    date: '',
                    paymentType: '',
                    amount: '',
                    status: '',
                });
                setError('');
            }
        } catch (error) {
            console.error('Ошибка при создании сделки:', error);
            setError('Не удалось создать сделку. Проверьте данные и попробуйте снова.');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Создать сделку</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <label className={styles.label}>Продукт:</label>
                    <input
                        className={styles.input}
                        type="text"
                        name="product"
                        value={formData.product}
                        onChange={handleChange}
                        placeholder="Введите название продукта"
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Клиент:</label>
                    <input
                        className={styles.input}
                        type="text"
                        name="client"
                        value={formData.client}
                        onChange={handleChange}
                        placeholder="Введите клиента"
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Дата:</label>
                    <input
                        className={styles.input}
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Тип оплаты:</label>
                    <select
                        className={styles.input}
                        name="paymentType"
                        value={formData.paymentType}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Выберите тип оплаты</option>
                        <option value="Наличный расчет">Наличный расчет</option>
                        <option value="Безналичный расчет">Безналичный расчет</option>
                    </select>
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Сумма:</label>
                    <input
                        className={styles.input}
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Введите сумму"
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}>Статус:</label>
                    <select
                        className={styles.input}
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Выберите статус</option>
                        <option value="Ожидается">Ожидается</option>
                        <option value="Выполнено">Выполнено</option>
                        <option value="Отменено">Отменено</option>
                    </select>
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button className={styles.button} type="submit">Создать</button>
            </form>
        </div>
    );
};

export default FormCreateDeal;