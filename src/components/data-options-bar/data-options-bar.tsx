import React, { FC } from "react";
import { Button, Divider, Flex } from "antd";
import { DownloadOutlined, FolderAddOutlined, CloseOutlined } from "@ant-design/icons";

import styles from './data-work-bar.module.css';

export const DataOptionsBar: FC = () => {
  return (
    <>
      <Divider className={styles.dividerTop}/>
      <Flex justify="space-between" align="center">
        <Flex align="center" gap="small">
          <Button type="link" icon={<DownloadOutlined/>} className={styles.button}>Загрузить данные из csv</Button>
          <Button type="link" icon={<FolderAddOutlined/>} className={styles.button}>Изменить данные</Button>
        </Flex>
        <Flex align="center" gap="small">
          <Divider type="vertical"/>
          <Button type="link" icon={<CloseOutlined />} iconPosition="end" className={styles.button}>Очистить</Button>
        </Flex>
      </Flex>
      <Divider className={styles.dividerBottom} />
    </>
  )
}