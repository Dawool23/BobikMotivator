import React from "react";
import styles from "./AchievementCards.module.css";

const AchievementCards = () => {
  return (
    <div className={styles.cardsContainer}>
      <div className={styles.card}>
        <h3>Место в рейтинге</h3>
        <div className={styles.cardContent}>
          <span className={styles.cardValue}>69/1290</span>
          <span className={styles.cardChange}>↓ -3 за прошлый месяц</span>
        </div>
      </div>
      <div className={styles.card}>
        <h3>Количество сделок</h3>
        <div className={styles.cardContent}>
          <span className={styles.cardValue}>90</span>
          <span className={styles.cardChange}>↑ +2 за прошлую неделю</span>
        </div>
      </div>
      <div className={styles.card}>
        <h3>Сумма продаж</h3>
        <div className={styles.cardContent}>
          <span className={styles.cardValue}>₽100,000,000</span>
          <span className={styles.cardChange}>↑ +20,000,000 за месяц</span>
        </div>
      </div>
    </div>
  );
};

export default AchievementCards;
