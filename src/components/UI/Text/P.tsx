import { FC, ReactNode } from "react";
import styles from "./styles.module.css";

export const P: FC<{ children: ReactNode }> = (props) => {
  return <p className={styles.text}>{props.children}</p>;
};
