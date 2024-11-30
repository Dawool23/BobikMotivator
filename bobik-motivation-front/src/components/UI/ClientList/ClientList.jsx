import React from 'react';
import styles from './ClientList.module.css';

const ClientList = () => {
	const holder = [
		{
			id: 1,
			name: 'Жилин Александр Анатольевич',
		},
		{
			id: 2,
			name: 'Моторин Сергей Викторович',
		},
		{
			id: 3,
			name: 'Ботвинков Антон Владимирович',
		},
	];
	const keys = Object.keys(holder[0]);

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
					{holder.map((holder, index) => (
						<tr key={index}>
							{keys.map(key => (
								<td>{holder[key]}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ClientList;
