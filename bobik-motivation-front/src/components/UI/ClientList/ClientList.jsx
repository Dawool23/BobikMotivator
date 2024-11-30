import React, { useContext, useEffect, useState } from 'react';
import styles from './ClientList.module.css';
import AuthContext from '../../../context/AuthContext';
import { fetchData } from '../../../API/API';

const ClientList = () => {
	const { authTokens } = useContext(AuthContext);
	const [clients, setClients] = useState([]);

/* 	useEffect(() => {
		const fetchClients = async () => {
			try {
				const response = await axios.get(
					process.env.REACT_APP_API_URL + '/api/clients',
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${authTokens?.access}`,
						},
					}
				);
				setClients(response.data); // Сохраняем данные клиентов
			} catch (error) {
				console.error('Ошибка при загрузке данных сотрудника:', error);
			}
		};

		fetchClients();
	}, []); */

	useEffect(() => {
		const fetchClients = async () => {
		  if (!authTokens) return; // Если нет токенов, не делаем запрос
	
		  try {
			// Получаем данные клиентов через API
			const data = await fetchData('/api/clients', authTokens.access);
			setClients(data); // Устанавливаем данные клиентов
		  } catch (error) {
			console.error('Ошибка при загрузке данных клиентов:', error);
		  }
		};
	
		fetchClients();
	  }, [authTokens]);

	const keys = clients.length > 0 ? Object.keys(clients[0]) : null;

	return (
		<div className={styles.historyContainer}>
			<h2 className={styles.title}>Клиенты</h2>
			<table className={styles.table}>
				<thead>
					<tr className={styles.bar}>
						<th>id</th>
						<th>ФИО</th>
					</tr>
				</thead>

				<tbody>
					{clients.map((holder, index) => (
						<tr key={index}>
							{keys.map((key) => (
								<td key={`${index}-${key}`}>{holder[key]}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ClientList;