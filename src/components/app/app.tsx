import React, { FC, useCallback, useState } from 'react';
import { Button, Layout } from 'antd';
import { MessageOutlined } from '@ant-design/icons';

import { SideMenu } from '../side-menu/side-menu';
import { SupportInfo } from "../support-info/support-info";
import { Header } from "../header/header";
import { FilterForm } from "../filter-form/filter-form";
import { Heading } from "../heading/heading";
import { DataOptionsBar } from "../data-options-bar/data-options-bar";
import { DataTable } from "../data-table/data-table";
import { Device } from '../../services/types';

import devices from '../../vendor/DATA.json';

export const App: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [globalData, setGlobalData] = useState<Device[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string }>({message: ''})

  const {Content, Sider} = Layout;

  const loadLocal = (): Promise<void> => {
    return Promise.resolve(devices)
      .then((res) => {
        setGlobalData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsError(true);
        setError({message: err.message});
        setIsLoading(false);
      })
  }

  const onClickLoadData = useCallback(() => {
    setIsLoading(true);
    // Устанавливаю таймер для имитации загрузки ответа с сервера и отображения прелаудера
    const fetchData = () => {
      setTimeout(() => {
        loadLocal();
      }, 1000);
    }
    fetchData();
  }, []);

  return (
    <Layout style={{}}>
      <Sider
        theme="light"
        breakpoint="lg"
        width="256px"
        style={{backgroundColor: "#f5f5f5"}}
      >
        <SideMenu/>
        <SupportInfo/>
        <Button type="primary" icon={<MessageOutlined/>} block size="large"
                style={{padding: "30px", borderRadius: "20px"}}>Связаться c нами</Button>
      </Sider>
      <Layout>
        <Header/>
        <Content style={{margin: '24px 0 0 16px'}}>
          <Heading/>
          <FilterForm exportingData={globalData}/>
          <DataOptionsBar onClickLoad={onClickLoadData}/>
          <DataTable dataSource={globalData} isLoading={isLoading} isError={isError} errorMessage={error.message}
                     setGlobalData={setGlobalData}/>
        </Content>
      </Layout>
    </Layout>
  );
};