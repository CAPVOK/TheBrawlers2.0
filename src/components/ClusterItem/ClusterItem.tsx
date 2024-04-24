import { FC } from "react";
import { clsx } from "clsx";
import styles from "./style.module.css";

interface IClusterItemProps {
  clickHandler: () => void;
  title: string;
  isActive: boolean;
  statusTitle: string;
}

const ClusterItem: FC<IClusterItemProps> = (props) => {
  const { clickHandler, title, isActive, statusTitle } = props;
  return (
    <div
      className={clsx(styles.task, {
        [styles.active]: isActive,
      })}
      onClick={clickHandler}
      tabIndex={0}
    >
      <p className={styles.text}>{title}</p>
      <p className={styles.status}>{statusTitle}</p>
    </div>
  );
};

export default ClusterItem;
