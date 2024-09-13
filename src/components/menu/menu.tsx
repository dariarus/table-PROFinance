import React, { FC } from 'react';
import { Menu, Typography, type MenuProps } from 'antd';
import { SettingOutlined, ContainerOutlined, FileTextOutlined, DatabaseOutlined } from '@ant-design/icons';

import styles from './menu.module.css';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'sub1',
    label: 'Настройки',
    icon: <SettingOutlined/>,
    className: styles.menuItem,
    children: [
      {
        key: 'g1',
        label: 'Item 1',
        type: 'group',
        className: styles.subMenuItem,
        children: [
          {key: '1', label: 'Option 1'},
          {key: '2', label: 'Option 2'},
        ],
      },
      {
        key: 'g2',
        label: 'Item 2',
        type: 'group',
        className: styles.subMenuItem,
        children: [
          {key: '3', label: 'Option 3'},
          {key: '4', label: 'Option 4'},
        ],
      },
    ],
  },
  {
    key: 'sub2',
    label: 'Внесенные данные',
    icon: <ContainerOutlined/>,
    className: styles.menuItem,
    children: [
      {key: '5', label: 'Option 5', className: styles.subMenuItem},
      {key: '6', label: 'Option 6', className: styles.subMenuItem},
      {
        key: 'sub3',
        label: 'Submenu',
        className: styles.subMenuItem,
        children: [
          {key: '7', label: 'Option 7', className: styles.subMenuItem},
          {key: '8', label: 'Option 8', className: styles.subMenuItem},
        ],
      },
    ],
  },
  {
    key: 'sub4',
    label: 'Отчеты',
    icon: <FileTextOutlined/>,
    className: styles.menuItem,
    children: [
      {key: '9', label: 'Option 9', className: styles.subMenuItem},
      {key: '10', label: 'Option 10', className: styles.subMenuItem},
      {key: '11', label: 'Option 11', className: styles.subMenuItem},
      {key: '12', label: 'Option 12', className: styles.subMenuItem},
    ],
  },
  {
    key: 'sub5',
    label: 'База знаний',
    icon: <DatabaseOutlined/>,
    className: styles.menuItem,
    children: [
      {key: '9', label: 'Option 9', className: styles.subMenuItem},
      {key: '10', label: 'Option 10', className: styles.subMenuItem},
      {key: '11', label: 'Option 11', className: styles.subMenuItem},
      {key: '12', label: 'Option 12', className: styles.subMenuItem},
    ],
  },
];

export const SideMenu: FC = () => {
  const {Title} = Typography;
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    <>
      <div className={styles.menuHeaderWrap}>
        <Title className={styles.menuHeader} level={4}>ФИН Контроль</Title>
      </div>
      <Menu onClick={onClick}
            className={styles.menu}
            selectable
            mode="inline"
            theme="dark"
            items={items}/>
    </>
  );
};