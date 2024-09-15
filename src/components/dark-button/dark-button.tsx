import React, { FC, ReactElement } from "react";
import { Button } from "antd";

import styles from "./dark-button.module.css";

type DarkButton = {
  icon: ReactElement,
  name: string
}

export const DarkButton: FC<DarkButton> = ({icon, name}) => {
  return (
    <Button type="primary" shape="round" icon={icon} className={styles.button}>{name}</Button>
  )
}