import React from 'react';
import styles from './HelpInfo.module.css';

const HelpInfo = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Справочная информация</h1>
            
            <section className={styles.section}>
                <h2 className={styles.subtitle}>Система мотивации</h2>
                <ul className={styles.list}>
                    <li>
                        <strong>1. Люксовость авто:</strong>
                        <ul>
                            <li>Комфорт = 0.5% от стоимости авто (15-30 тыс.) — 3-6 млн</li>
                            <li>Бизнес = 0.5% от стоимости авто (30-50 тыс.) — 6-10 млн</li>
                            <li>Премиум = 0.5% от стоимости авто (от 50 тыс.) — 10+ млн</li>
                        </ul>
                    </li>
                    <li>
                        <strong>2. Тип оплаты:</strong>
                        <ul>
                            <li>Через банк: +0% к проценту за продажу</li>
                            <li>Наличными: +0.5% к проценту за продажу</li>
                            <li>Кредит: +0.8% к проценту за продажу</li>
                        </ul>
                    </li>
                    <li>
                        <strong>3. Перевыполнение плана:</strong> +5% от суммы продаж
                    </li>
                    <li>
                        <strong>4. Мотивация внутри отдела:</strong>
                        <ul>
                            <li>1 место: +15% от суммы продаж</li>
                            <li>2 место: +14% от суммы продаж</li>
                            <li>3 место: +13% от суммы продаж</li>
                            <li>4 место: +12% от суммы продаж</li>
                            <li>5 место: +11% от суммы продаж</li>
                        </ul>
                    </li>
                    <li>
                        <strong>5. Мотивация между филиалами:</strong>
                        <ul>
                            <li>1 место: +7% от суммы выше</li>
                            <li>2 место: +6% от суммы выше</li>
                            <li>3 место: +5% от суммы выше</li>
                        </ul>
                    </li>
                    <li>
                        <strong>6. Мотивация за срок работы:</strong>
                        <ul>
                            <li>1 год: +2% от суммы выше</li>
                            <li>2 года: +4% от суммы выше</li>
                            <li>3 года: +6% от суммы выше</li>
                        </ul>
                    </li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2 className={styles.subtitle}>Пример расчета</h2>
                <p>Сотрудник продал авто и заимел <strong>215 000 руб.</strong></p>
                <ol className={styles.exampleList}>
                    <li>Перевыполнил план: <strong>215 000 + 10 750</strong></li>
                    <li>Занял 2 место внутри отдела: <strong>215 000 + 10 750 + 30 100</strong></li>
                    <li>Филиал занял 1 место по продажам: <strong>255 850 + 17 909</strong></li>
                    <li>Сотрудник работает 2 года: <strong>273 759 + 10 950</strong></li>
                </ol>
                <p className={styles.total}>
                    <strong>Итого:</strong> 15 000 (МРОТ) + 284 709 = <strong>299 709 руб.</strong>
                </p>
            </section>
        </div>
    );
};

export default HelpInfo;