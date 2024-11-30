import React from 'react';

const Header = () => {
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
