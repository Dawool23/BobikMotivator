import React from 'react';
import AchievementCards from '../components/UI/AchievementCards/AchievementCards';
import SalesHistory from '../components/UI/SalesHistory/SalesHistory';

const Achievements = () => {
	return (
		<div className='main-holder'>
			<h1 className='title'>Достижения</h1>
			<AchievementCards />
			<SalesHistory />
		</div>
	);
};

export default Achievements;
