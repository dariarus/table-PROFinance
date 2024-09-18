import React, { FC } from 'react';
import { Button, Flex, Form, Input } from 'antd';
import { ExportOutlined } from "@ant-design/icons";

import styles from './filter-form.module.css';
import { InputWrap } from "../input-wrap/input-wrap";
import { DarkButton } from "../dark-button/dark-button";
import { Device } from "../../services/types";
import { formatDate } from "../../services/utils/functions";

type Props = {
  exportingData: Device[];
}

export const FilterForm: FC<Props> = ({exportingData}) => {
  const exportToJson = () => {
    const json = JSON.stringify(exportingData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);

    const timestamp = formatDate();
    const filename = `DATA_${timestamp}.json`;

    const link = document.createElement('a');
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

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