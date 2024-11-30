import React from 'react';
import styles from './ProductList.module.css';

const ProductList = () => {
	const holder = [
		{
			id: 1,
			name: 'BMW 840d xDrive',
			description: 'Состояние: Новое',
			sum: '₽10,000,000',
		},
		{
			id: 2,
			name: 'Toyota Camry XV80',
			description: 'Состояние: Новое',
			sum: '₽4,000,000',
		},
		{
			id: 3,
			name: 'Mercedes-AMG G63',
			description: 'Состояние: Новое',
			sum: '₽40,000,000',
		},
	];
	const keys = Object.keys(holder[0]);

	return (
		<div className={styles.historyContainer}>
			<h2 className={styles.title}>Наличие товара</h2>
			<table className={styles.table}>
				<thead>
					<tr className={styles.bar}>
						<th>id</th>
						<th>Наименование</th>
						<th>Описание</th>
						<th>Сумма</th>
					</tr>
				</thead>

				<tbody>
					{holder.map((holder, index) => (
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

export default ProductList;
