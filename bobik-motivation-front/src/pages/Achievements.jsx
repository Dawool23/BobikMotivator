import React from 'react';
import AchievementCards from '../components/UI/AchievementCards/AchievementCards';
import SalesHistory from '../components/UI/SalesHistory/SalesHistory';
/* import styles from "./Achievements.module.css"; */

const Achievements = () => {
	return (
		<div className='achievements'>
			<h1 className='title'>Достижения</h1>
			<AchievementCards />
			<SalesHistory />
		</div>
	);
};

export default Achievements;

/* import AchievementСards from "../components/UI/AchievementСards/AchievementСards";
import SalesHistory from "../components/UI/SalesHistory/SalesHistory"; */

/* import { useContext } from "react";
import { AuthContext } from "../context";


export default function Achievements() {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'false')
    }
    async function getSales() {

    }


    return (
        <div>
            <h1>Личный кабинет</h1>
        </div>
    )
} */

/* const Achievements = () => {
    return (
        <div>
            <h1>Достижения</h1>
            <AchievementСards/>
            <SalesHistory/>
        </div>
    );
};

export default Achievements; */
