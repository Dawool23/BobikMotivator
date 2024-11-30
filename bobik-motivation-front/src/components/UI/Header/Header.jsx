import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [currentDate, setCurrentDate] = useState(new Date().toLocaleString('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date().toLocaleString('ru-RU', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }));
        }, 5000); // 20 секунд

        return () => clearInterval(intervalId); 
    }, []);

    return (
        <div className="header">
            <div className="dateUserSection">
                <p>Сегодня: {currentDate}</p>
            </div>
            <div className="centerSection">
            </div>
        </div>
    );
};

export default Header;