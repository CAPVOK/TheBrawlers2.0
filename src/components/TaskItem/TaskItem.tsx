import { FC } from "react";
import { clsx } from "clsx";
import styles from "./style.module.css";

interface ITaskItemProps {
  clickHandler: () => void;
  title: string;
  isActive: boolean;
}

const TaskItem: FC<ITaskItemProps> = (props) => {
  const { clickHandler, title, isActive } = props;
  return (
    <div
      className={clsx(styles.task, { [styles.active]: isActive })}
      onClick={clickHandler}
    >
      <p className={styles.text}>{title}</p>
    </div>
  );
};

export default TaskItem;
