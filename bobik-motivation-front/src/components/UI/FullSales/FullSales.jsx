import React from 'react';
import styles from './SalesHistory.module.css';

const SalesHistory = () => {
	const holder = [
		{
			id: 1,
			name: 'BMW 840d xDrive',
			client: 'Степанов Кирилл Валерьевич',
			date: '01.01.2024',
			sum: '₽10,000,000',
		},
		{
			id: 2,
			name: 'Toyota Camry XV80',
			client: 'Моторин Сергей Викторович',
			date: '17.06.2024',
			sum: '₽4,000,000',
		},
		{
			id: 3,
			name: 'Mercedes-AMG G63',
			client: 'Жилин Александр Анатольевич',
			date: '29.11.2024',
			sum: '₽40,000,000',
		},
	];
	const keys = Object.keys(holder[0]);

	return (
		<div className={styles.historyContainer}>
			<h2 className={styles.title}>История сделок</h2>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>id</th>
						<th>Наименование</th>
						<th>Клиент</th>
						<th>Дата</th>
						<th>Сумма</th>
						<th>Состояние</th>
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
					<tr>
						<td>1</td>
						<td>BMW 840d xDrive</td>
						<td>Степанов Кирилл Валерьевич</td>
						<td>01.01.2024</td>
						<td>₽10,000,000</td>
						<td className={styles.completed}>Завершено</td>
					</tr>
					<tr>
						<td>2</td>
						<td>Toyota Camry XV80</td>
						<td>Моторин Сергей Викторович</td>
						<td>17.06.2024</td>
						<td>₽4,000,000</td>
						<td className={styles.canceled}>Отменено</td>
					</tr>
					<tr>
						<td>3</td>
						<td>Mercedes-AMG G63</td>
						<td>Жилин Александр Анатольевич</td>
						<td>29.11.2024</td>
						<td>₽40,000,000</td>
						<td className={styles.processing}>В обработке</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default SalesHistory;
