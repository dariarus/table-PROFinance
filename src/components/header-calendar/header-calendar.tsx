import React, { CSSProperties, FC } from 'react';
import { Calendar, theme, type CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';

const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
  console.log(value.format('DD-MM-YYYY'), mode);
};

export const HeaderCalendar: FC = () => {
  const {token} = theme.useToken();

  const wrapperStyle: CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <div style={wrapperStyle}>
      <Calendar fullscreen={false} onPanelChange={onPanelChange}/>
    </div>
  );
};