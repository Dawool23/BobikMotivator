import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../../../context/AuthContext';

const Header = () => {
	const [currentDate, setCurrentDate] = useState(
		new Date().toLocaleString('ru-RU', {
			day: '2-digit',
			month: 'long',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		})
	);

	
	const [employee, setEmployee] = useState(null); // Данные о сотруднике
	const { tokens } = useContext(AuthContext);

	useEffect(() => {
	/* 	const tokens = localStorage.getItem('authTokens'); */
	/* 	const access = tokens['access'];
		console.log(tokens);
		console.log(access); */
		
		// Запрос данных сотрудника
		const fetchEmployee = async () => {
			try {
				const response = await axios.get(process.env.REACT_APP_API_URL + '/api/employee', {
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${tokens?.access}`,
					},
			}); // Укажите ваш эндпоинт API

				setEmployee(response.data); // Сохраняем данные сотрудника
			} catch (error) {
				console.error('Ошибка при загрузке данных сотрудника:', error);
			}
		};

		fetchEmployee();
	}, []);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentDate(
				new Date().toLocaleString('ru-RU', {
					day: '2-digit',
					month: 'long',
					year: 'numeric',
					hour: '2-digit',
					minute: '2-digit',
				})
			);
		}, 5000); // 20 секунд

		return () => clearInterval(intervalId);
	}, []);


	return (
		<div className='header'>
			<div className='logo'>
				<span className='trade'>Trade</span>
				<span className='track'>Track</span>
			</div>
			<div className='information'>
				<span className='name'>{employee ? employee.fio?.split(' ')[0] : 'Загрузка...'}</span>
				<span className='role'>{employee ? employee.id_roles : '...'}</span>
			</div>
		</div>
	);
};

export default Header;
