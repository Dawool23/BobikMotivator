import React, { useContext, useEffect, useState } from 'react';
import styles from './ProductList.module.css';
import AuthContext from '../../../context/AuthContext';
import { fetchData } from '../../../API/API';

const ProductList = () => {
	const { authTokens } = useContext(AuthContext);
	const [products, setProducts] = useState([]);

/* 	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get(
					process.env.REACT_APP_API_URL + '/api/product',
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${authTokens?.access}`,
						},
					}
				);
				setProducts(response.data); // Сохраняем товары
			} catch (error) {
				console.error('Ошибка при загрузке данных сотрудника:', error);
			}
		};

		fetchProducts();
	}, []); */

	useEffect(() => {
		const fetchProducts = async () => {
		  if (!authTokens) return; // Если нет токенов, не делаем запрос
	
		  try {
			// Получаем данные продуктов через API
			const data = await fetchData('/api/product', authTokens.access);
			setProducts(data); // Устанавливаем данные продуктов
		  } catch (error) {
			console.error('Ошибка при загрузке данных продуктов:', error);
		  }
		};
	
		fetchProducts();
	  }, [authTokens]);

	const keys = products.length > 0 ? Object.keys(products[0]) : null;

	return (
		<div className={styles.historyContainer}>
			<h2 className={styles.title}>Наличие товара</h2>
			<table className={styles.table}>
				<thead>
					<tr className={styles.bar}>
						<th>id</th>
						<th>Наименование</th>
						<th>Сумма</th>
						<th>Коэффициент</th>
						<th>Описание</th>
					</tr>
				</thead>

				<tbody>
					{products.map((holder, index) => (
						<tr key={index}>
							{keys.map((key) => (
								<td>{holder[key]}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProductList;