import React, { FC, ReactElement } from "react";
import { Button } from "antd";

import styles from "./dark-button.module.css";

type DarkButton = {
  icon: ReactElement;
  name: string;
  onExportClick: () => void;
}

export const DarkButton: FC<DarkButton> = ({icon, name, onExportClick}) => {
  return (
    <Button type="primary" shape="round" icon={icon} className={styles.button} onClick={onExportClick}>{name}</Button>
  )
}