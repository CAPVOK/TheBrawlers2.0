import { FC } from "react";
import { clsx } from "clsx";
import styles from "./style.module.css";

interface IUserItemProps {
  clickHandler: () => void;
  // id: number;
  email: string;
  isActive: boolean;
  kpd?: number;
  avgDuration: Float32Array;
}

const UserItem: FC<IUserItemProps> = (props) => {
  const { clickHandler, isActive, email, avgDuration } = props;

  return (
    <div
      className={clsx(styles.task, {
        [styles.active]: isActive,
      })}
      onClick={clickHandler}
      tabIndex={0}
    >
      <p className={styles.text}>{email}</p>
      <p className={styles.info}>{avgDuration}</p>
    </div>
  );
};

export default UserItem;
