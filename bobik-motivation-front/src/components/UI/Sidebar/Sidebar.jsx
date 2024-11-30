import React, { useContext } from 'react';
import { AuthContext } from '../../../context';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = () => {
	const { isAuth, setIsAuth } = useContext(AuthContext);

	const exit = event => {
		event.preventDefault();
		setIsAuth(false);
		localStorage.setItem('auth', 'false');
	};

	return (
		<div className='sidebar'>
			<div className='block nav'>
				<div className={styles.link}>
					<Link className={styles.alink} to={'achievements'}>
						Достижения
					</Link>
				</div>
				<div className={styles.link}>
					<Link className={styles.alink} to={'products'}>
						Товары
					</Link>
				</div>
				<div className={styles.link}>
					<Link className={styles.alink} to={'clients'}>
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
