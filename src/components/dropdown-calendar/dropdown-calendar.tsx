import React, { FC, useState } from 'react';
import { Dropdown, Button } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

import { HeaderCalendar } from "../header-calendar/header-calendar";

const DropdownCalendar: FC = () => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };

  return (
      <Dropdown
        dropdownRender={() => <HeaderCalendar/>}
        trigger={['click']}
        open={visible}
        onOpenChange={handleVisibleChange}
      >
        <Button type="primary" size="large" ghost icon={<CalendarOutlined/>}>Тариф до 01.01.2031</Button>
      </Dropdown>
  );
};

export default DropdownCalendar;
