import React, { FC } from "react";
import { UserOutlined, ArrowRightOutlined } from '@ant-design/icons';

import styles from './header.module.css';
import DropdownCalendar from "../dropdown-calendar/dropdown-calendar";
import { Button, Typography } from "antd";

export const Header: FC = () => {
  const {Paragraph} = Typography;

  return (
    <header className={styles.header}>
      <div className={styles.userWrap}>
        <div className={styles.userNameWrap}>
          <UserOutlined/>
          <Paragraph className={styles.text}>Иванов И.И.</Paragraph>
        </div>
        <DropdownCalendar/>
      </div>
      <div className={styles.buttonsWrap}>
        <Button type="default" shape="round">Выйти</Button>
        <Button type="primary" shape="round" icon={<ArrowRightOutlined/>} iconPosition="end"
                href="https://www.example.com" className={styles.filledButton} style={{}}>О нас</Button>
      </div>
    </header>
  )
}