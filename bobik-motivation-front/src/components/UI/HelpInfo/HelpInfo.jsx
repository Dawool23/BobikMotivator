import React from 'react';
import styles from './HelpInfo.module.css';

const HelpInfo = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Из чего складывается доход?</h1>

			<section className={styles.section}>
				<ul className={styles.list}>
					<li>
						<strong>1. Класс проданного авто:</strong>
						<ul>
							<li>Комфорт = 0.5% от стоимости авто</li>
							<li>Бизнес = 0.5% от стоимости авто</li>
							<li>Премиум = 0.5% от стоимости авто</li>
						</ul>
					</li>
					<li>
						<strong>2. Тип оплаты:</strong>
						<ul>
							<li>Безналичный расчет: +0% к проценту за продажу</li>
							<li>Наличный расчет: +0.5% к проценту за продажу</li>
							<li>Оформление кредита: +0.8% к проценту за продажу</li>
						</ul>
					</li>
					<li>
						<strong>3. Перевыполнение плана:</strong> +5% от суммы продаж
					</li>
					<li>
						<strong>4. Мотивация в рамках отдела (На основе рейтинга):</strong>
						<ul>
							<li>1 место: +15% от суммы продаж</li>
							<li>2 место: +14% от суммы продаж</li>
							<li>3 место: +13% от суммы продаж</li>
							<li>4 место: +12% от суммы продаж</li>
							<li>5 место: +11% от суммы продаж</li>
						</ul>
					</li>
					<li>
						<strong>
							5. Мотивация между филиалами (На основе рейтинга филиала):
						</strong>
						<ul>
							<li>1 место: +7% от суммы выше</li>
							<li>2 место: +6% от суммы выше</li>
							<li>3 место: +5% от суммы выше</li>
						</ul>
					</li>
					<li>
						<strong>6. Надбавка за стаж работы:</strong>
						<ul>
							<li>от 1 года: +2% от суммы выше</li>
							<li>от 3 лет: +4% от суммы выше</li>
							<li>от 6 лет: +6% от суммы выше</li>
						</ul>
					</li>
				</ul>
			</section>
		</div>
	);
};

export default HelpInfo;
