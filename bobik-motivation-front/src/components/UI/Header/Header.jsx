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



/* 	  const { authTokens } = useContext(AuthContext); 
	  const [employee, setEmployee] = useState(null); 

	  useEffect(() => {
		const fetchEmployee = async () => {
		  if (!authTokens) return;
	
		  try {
			const employeeData = await fetchData('/api/employee', authTokens.access);
	
			const employee = employeeData.find(emp => emp.id === authTokens.user.id);
			setEmployee(employee); 
		  } catch (error) {
			console.error('Ошибка при загрузке данных сотрудника:', error);
		  }
		};
	
		fetchEmployee(); 
	  }, [authTokens]);  */


	  const [user, setUser] = useState(() => {
		const storedUser = localStorage.getItem("user");
		return storedUser ? JSON.parse(storedUser) : null; // Загружаем данные из localStorage
	  });
	
	  const [authTokens, setAuthTokens] = useState(() => {
		const storedTokens = localStorage.getItem("authTokens");
		return storedTokens ? JSON.parse(storedTokens) : null; // Загружаем токены из localStorage
	  });
	
	  const [employee, setEmployee] = useState(null);
	
	  useEffect(() => {
		const fetchEmployee = async () => {
		  if (!authTokens || !user || !user.user_id) {
			console.log("Данные пользователя:", user);
			console.error('Отсутствуют данные пользователя или токены');
			return;
		  }
	
		  try {
			// Получаем данные сотрудников
			const employeeData = await fetchData('/api/employee', authTokens.access);
			console.log("Данные сотрудников:", employeeData);
	
			// Ищем сотрудника по user_id
			const foundEmployee = employeeData.find(emp => emp.user === user.user_id);
	
			if (foundEmployee) {
			  setEmployee(foundEmployee);
			} else {
			  console.error('Сотрудник не найден');
			}
		  } catch (error) {
			console.error('Ошибка при загрузке данных сотрудника:', error);
		  }
		};
	
		if (authTokens && user && user.user_id) {
		  fetchEmployee();
		}
	  }, [authTokens, user]);
	
	  
	  
	  


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
