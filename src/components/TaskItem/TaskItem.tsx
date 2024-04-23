import { FC } from "react";
import { clsx } from "clsx";
import styles from "./style.module.css";

interface ITaskItemProps {
  clickHandler: () => void;
  title: string;
  isActive: boolean;
  statusTitle: string;
  isUser: boolean;
}

const TaskItem: FC<ITaskItemProps> = (props) => {
  const { clickHandler, title, isActive, statusTitle, isUser } = props;

  if (isUser) console.log(title);

  return (
    <div
      className={clsx(styles.task, {
        [styles.active]: isActive,
        [styles.user]: isUser,
      })}
      onClick={clickHandler}
      tabIndex={0}
    >
      <p className={styles.text}>{title}</p>
      <p className={styles.status}>{statusTitle}</p>
    </div>
  );
};

export default TaskItem;
