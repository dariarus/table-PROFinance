import React, { FC } from 'react';
import { Button, Flex, Form, Input } from 'antd';
import { ExportOutlined } from "@ant-design/icons";

import styles from './filter-form.module.css';
import { InputWrap } from "../input-wrap/input-wrap";
import { DarkButton } from "../dark-button/dark-button";

export const FilterForm: FC = () => {
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
        <DarkButton icon={<ExportOutlined />} name="Экспорт"/>
      </Flex>
    </Form>
  );
};