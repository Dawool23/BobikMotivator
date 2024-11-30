import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context';
import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = () => {
	const { isAuth, setIsAuth } = useContext(AuthContext);
	const [lastUrlSegment, setLastUrlSegment] = useState();
	const location = useLocation();

	useEffect(() => {
		const url = location.pathname;
		const segments = url.split('/').filter(segment => segment.length > 0);
		const lastSegment =
			segments.length > 0 ? segments[segments.length - 1] : '';
		setLastUrlSegment(lastSegment);
	}, location);

	const exit = event => {
		event.preventDefault();
		setIsAuth(false);
		localStorage.setItem('auth', 'false');
	};

	return (
		<div className='sidebar'>
			<div className='block nav'>
				<div className={styles.link}>
					<Link
						className={`${styles.alink} ${
							lastUrlSegment == 'achievements' ? styles.active : ''
						}`}
						to={'achievements'}
						onClick={() => setLastUrlSegment('achievements')}
					>
						Достижения
					</Link>
				</div>
				<div className={styles.link}>
					<Link
						className={`${styles.alink} ${
							lastUrlSegment == 'products' ? styles.active : ''
						}`}
						to={'products'}
						onClick={() => setLastUrlSegment('products')}
					>
						Товары
					</Link>
				</div>
				<div className={styles.link}>
					<Link
						className={`${styles.alink} ${
							lastUrlSegment == 'clients' ? styles.active : ''
						}`}
						to={'clients'}
						onClick={() => setLastUrlSegment('clients')}
					>
						Клиенты
					</Link>
				</div>
			</div>
			<div className='block add'>
				<div className={styles.mlink}>
					<Link className={styles.alink} to={'achievements'}>
						Создать сделку
					</Link>
				</div>
				<div className={styles.mlink}>
					<Link className={styles.alink} to={'products'}>
						Добавить клиента
					</Link>
				</div>
				<div className={styles.mlink}>
					<Link className={styles.alink} to={'clients'}>
						Справка о доходе
					</Link>
				</div>
			</div>
			<div className='block exit'>
				<button className='exitButton' onClick={exit}>
					Выйти
				</button>
			</div>
		</div>
	);
};

export default Sidebar;
