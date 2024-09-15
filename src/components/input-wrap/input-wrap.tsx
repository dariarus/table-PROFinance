import React, { FC, PropsWithChildren } from "react";

import styles from './input-wrap.module.css';

export const InputWrap: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={styles.inputWrap}>
      {children}
    </div>
  )
}