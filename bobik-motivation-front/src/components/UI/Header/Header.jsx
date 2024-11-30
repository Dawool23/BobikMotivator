import React, { useState, useEffect } from 'react';

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
				<span className='name'>Бобиков Бобик</span>
				<span className='role'>Менеджер</span>
			</div>
		</div>
	);
};

export default Header;
