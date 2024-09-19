import React, { FC } from "react";
import { Flex, Typography } from "antd";
import { FileUnknownOutlined } from "@ant-design/icons";

import styles from './heading.module.css';
import { DarkButton } from "../dark-button/dark-button";

export const Heading: FC = () => {
  const {Title} = Typography;

  return (
    <Flex align="center" gap="middle">
      <Title className={styles.heading} level={1}>Остатки сформированы на 14.09.2024</Title>
      <DarkButton icon={<FileUnknownOutlined/>} name="Инструкции"/>
    </Flex>
  )
}