import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../../../context/AuthContext';
import { fetchData } from '../../../API/API';
/* import { getEmployeeData } from '../../../API/API'; */

const Header = () => {
	
/* 	const [employee, setEmployee] = useState(null); // Данные о сотруднике
	const { tokens } = useContext(AuthContext);

	useEffect(() => {
		const tokens = localStorage.getItem('authTokens');
	 	const access = tokens['access'];
		console.log(tokens);
		console.log(access); 
		
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
	}, []); */


/*	
	const [employee, setEmployee] = useState(null); // Данные о сотруднике
	const { authTokens } = useContext(AuthContext);
	console.log(authTokens);
	
 	useEffect(() => {

		const fetchEmployee = async () => {
		  try {
			const response = await axios.get(process.env.REACT_APP_API_URL + '/api/employee', {
			  headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${authTokens?.access}`,  
			  },
			});

			console.log('Response data:', response.data);  
	
			
			const employee = response.data.find(emp => emp.id_roles === 'Менеджер');
			setEmployee(employee); 
		  } catch (error) {
			console.error('Ошибка при загрузке данных сотрудника:', error);
		  }
		};
	
		if (authTokens) {
		  fetchEmployee(); 
		}
	  }, [authTokens]); */

	  const { authTokens } = useContext(AuthContext); // Получаем токены из контекста
	  const [employee, setEmployee] = useState(null); // Состояние для данных сотрудника

	  useEffect(() => {
		const fetchEmployee = async () => {
		  if (!authTokens) return; // Если нет токенов, не делаем запрос
	
		  try {
			// Получаем данные о сотруднике через API
			const employeeData = await fetchData('/api/employee', authTokens.access);
	
			// Находим сотрудника с ролью "Менеджер"
			const employee = employeeData.find(emp => emp.id_roles === 'Менеджер');
			setEmployee(employee); // Устанавливаем данные сотрудника
		  } catch (error) {
			console.error('Ошибка при загрузке данных сотрудника:', error);
		  }
		};
	
		fetchEmployee(); // Вызываем функцию для получения данных
	  }, [authTokens]); // Эффект зависит от authTokens


	return (
		<div className='header'>
			<div className='logo'>
				<span className='trade'>Trade</span>
				<span className='track'>Track</span>
			</div>
			<div className='information'>
				<span className='name'>{employee ? (employee.fio ? employee.fio.split(' ')[0] : 'Без имени') : 'Загрузка...'}</span>
				<span className='role'>{employee ? employee.id_roles : '...'}</span>
			</div>
		</div>
	);
};

export default Header;
