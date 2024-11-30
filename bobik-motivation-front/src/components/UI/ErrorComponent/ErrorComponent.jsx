import React from 'react';
import styles from './ErrorComponent.module.css';
import pic404 from './error.png'
import { Link } from 'react-router-dom';

const ErrorComponent = () => {
    return (
        <div className="conteiner">
            <div className={styles.info}>
                <img src={pic404} alt="404 error" className={styles.image} />
                <h2 className={styles.name}>Кажется, кто-то перепутал адрес...</h2>
                <p className={styles.description}>Мы не можем найти эту страницу. Возможно, она была перемещена или никогда не существовала.</p>
                
                <Link to="/">
                     <button>
                     Вернуться на главную
                     </button>
                </Link> 

                
            </div>
        </div>
    );
};

export default ErrorComponent;