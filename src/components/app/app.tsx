import React, { FC } from 'react';
import { Button, Layout, theme } from 'antd';
import {MessageOutlined} from '@ant-design/icons';

import { SideMenu } from '../menu/side-menu';
import { SupportInfo } from "../support-info/support-info";

const {Header, Content, Sider} = Layout;

export const App: FC = () => {
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();


  return (
    <Layout style={{backgroundColor: "#DFDFDF"}}>
      <Sider
        theme="light"
        breakpoint="lg"
        width="256px"
      >
        <SideMenu/>
        <SupportInfo/>
        <Button type="primary" icon={<MessageOutlined />} block size="large" style={{padding: "30px", borderRadius: "20px"}}>Связаться нами</Button>
      </Sider>
      <Layout>
        <Header style={{padding: 0, background: colorBgContainer}}/>
        <Content style={{margin: '24px 16px 0'}}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            content
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};