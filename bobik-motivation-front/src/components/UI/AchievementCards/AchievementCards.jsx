import React from 'react';
import styles from './AchievementCards.module.css';

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
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='-0.5 -0.5 24 24'
									id='Trending-Down-Fill--Streamline-Sharp-Fill-Material-Symbols'
									height={20}
									width={20}
								>
									<path
										fill='#bb1c1c'
										d='M15.644791666666666 17.25v-1.4375H18.6875L12.913541666666667 10.038541666666667 8.912500000000001 14.039583333333335 1.9166666666666667 7.067708333333334l1.0302083333333334 -1.0302083333333334L8.888541666666667 11.979166666666668l4.001041666666667 -4.001041666666667L19.669791666666665 14.758333333333335v-2.9468750000000004H21.083333333333336V17.25H15.644791666666666Z'
										strokeWidth={1}
									/>
								</svg>
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
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='-0.5 -0.5 24 24'
									id='Trending-Up-Fill--Streamline-Sharp-Fill-Material-Symbols'
									height={20}
									width={20}
								>
									<path
										fill='#1cbb3e'
										d='M2.9468750000000004 17.25 1.9166666666666667 16.21979166666667 8.912500000000001 9.247916666666667l4.001041666666667 4.001041666666667L18.6875 7.4750000000000005h-3.042708333333333v-1.4375H21.083333333333336v5.438541666666667h-1.4135416666666667V8.529166666666667L12.889583333333333 15.309375000000001l-4.001041666666667 -4.001041666666667L2.9468750000000004 17.25Z'
										strokeWidth={1}
									/>
								</svg>
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
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='-0.5 -0.5 24 24'
									id='Trending-Up-Fill--Streamline-Sharp-Fill-Material-Symbols'
									height={20}
									width={20}
								>
									<path
										fill='#1cbb3e'
										d='M2.9468750000000004 17.25 1.9166666666666667 16.21979166666667 8.912500000000001 9.247916666666667l4.001041666666667 4.001041666666667L18.6875 7.4750000000000005h-3.042708333333333v-1.4375H21.083333333333336v5.438541666666667h-1.4135416666666667V8.529166666666667L12.889583333333333 15.309375000000001l-4.001041666666667 -4.001041666666667L2.9468750000000004 17.25Z'
										strokeWidth={1}
									/>
								</svg>
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
