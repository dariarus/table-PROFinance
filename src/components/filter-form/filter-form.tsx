import React, { FC } from 'react';
import { Button, Flex, Form, Input } from 'antd';
import { ExportOutlined } from "@ant-design/icons";

import styles from './filter-form.module.css';
import { InputWrap } from "../input-wrap/input-wrap";
import { DarkButton } from "../dark-button/dark-button";
import { Device } from "../../services/types";

type Props = {
  exportingData: Device[];
}

export const FilterForm: FC<Props> = ({exportingData}) => {
  const exportToJson = () => {
    const json = JSON.stringify(exportingData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);

    // Создаем ссылку для скачивания
    const link = document.createElement('a');
    link.href = href;
    link.download = 'newData.json'; // Имя файла
    document.body.appendChild(link);
    link.click();

    // Удаляем ссылку после скачивания
    document.body.removeChild(link);
  };

  return (
    <Form variant="filled" size="large">
      <Flex gap="middle" className={styles.inputsWrap}>
        <InputWrap>
          <Form.Item label="Баркод" className={styles.formItem}>
            <Input/>
          </Form.Item>
        </InputWrap>
        <InputWrap>
          <Form.Item label="Бренд" className={styles.formItem}>
            <Input/>
          </Form.Item>
        </InputWrap>
        <InputWrap>
          <Form.Item label="Наименование" className={styles.formItem}>
            <Input/>
          </Form.Item>
        </InputWrap>
      </Flex>
      <Flex gap="middle">
        <Button type="primary" shape="round">Сформировать</Button>
        <DarkButton icon={<ExportOutlined />} name="Экспорт" onExportClick={exportToJson}/>
      </Flex>
    </Form>
  );
};