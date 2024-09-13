import React, { FC } from "react";
import { Typography } from "antd";

import styles from './support-info.module.css';

export const SupportInfo: FC = () => {
  const {Title, Paragraph, Link} = Typography;

  return (
    <div className={styles.infoContainer}>
      <Title level={5} className={styles.header}>Техническая поддержка</Title>
      <div className={styles.flexWrap}>
        <div className={styles.textWrap}>
          <Paragraph className={`${styles.text} ${styles.textSecondary}`}>Номер поддержки:</Paragraph>
          <Paragraph className={styles.text}>8 (999) 999 99 99</Paragraph>
        </div>
        <div className={styles.textWrap}>
          <Paragraph className={`${styles.text} ${styles.textSecondary}`}>Почта поддержки:</Paragraph>
          <Paragraph className={styles.text}>example@example.com</Paragraph>
        </div>
      </div>
      <Paragraph className={`${styles.text} ${styles.textSecondary}`}>Часы работы:</Paragraph>
      <Paragraph className={styles.text}>Пн-Пт с 9:00 до 19:00 Мск</Paragraph>
      <div className={styles.lawInfoWrap}>
        <Link href="/example.com" className={`${styles.text} ${styles.textSecondary} ${styles.link}`}>Пользовательское соглашение</Link>
        <span className={styles.span}></span>
        <Link href="/example.com" className={`${styles.text} ${styles.textSecondary} ${styles.link}`}>Политика конфиденциальности</Link>
        <span className={styles.span}></span>
        <Link href="/example.com" className={`${styles.text} ${styles.textSecondary} ${styles.link}`}>Юридическая информация</Link>
        <span className={styles.span}></span>
        <Link href="/example.com" className={`${styles.text} ${styles.textSecondary} ${styles.link}`}>Публичная оферта</Link>
      </div>
    </div>
  )
}