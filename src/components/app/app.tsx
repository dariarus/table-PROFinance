import React from 'react';
import { Layout, theme } from 'antd';

import { SideMenu } from '../menu/menu';

const {Header, Content, Sider} = Layout;

export const App: React.FC = () => {
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