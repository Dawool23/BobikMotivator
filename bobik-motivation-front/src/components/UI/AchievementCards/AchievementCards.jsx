import React from 'react';
import styles from './AchievementCards.module.css';
import NegativeIncrease from './NegativeIncrease';
import PositiveIncrease from './PositiveIncrease';

const AchievementCards = () => {
	return (
		<div className={styles.cardsContainer}>
			<div className={styles.card}>
				<h3>Место в рейтинге</h3>
				<div className={styles.cardContent}>
					<div className={styles.raitingnumber}>
						<span className={styles.cardValue}>69</span>
						<span className={styles.raitingtext}>/1290</span>
					</div>
					<div className={styles.raitingchange}>
						<span>
							<span className={styles.negative}>
								<NegativeIncrease />
								-3
							</span>{' '}
							за прошлый месяц
						</span>
					</div>
				</div>
			</div>
			<div className={styles.card}>
				<h3>Количество сделок</h3>
				<div className={styles.cardContent}>
					<div className={styles.raitingnumber}>
						<span className={styles.cardValue}>90</span>
					</div>
					<div className={styles.raitingchange}>
						<span>
							<span className={styles.positive}>
								<PositiveIncrease />
								+2
							</span>{' '}
							за прошлый месяц
						</span>
					</div>
				</div>
			</div>
			<div className={styles.card}>
				<h3>Сумма продаж</h3>
				<div className={styles.cardContent}>
					<div className={styles.raitingnumber}>
						<span className={styles.cardValue}>₽100,000,000</span>
					</div>
					<div className={styles.raitingchange}>
						<span>
							<span className={styles.positive}>
								<PositiveIncrease />
								+20,000,000
							</span>{' '}
							за прошлый месяц
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AchievementCards;
