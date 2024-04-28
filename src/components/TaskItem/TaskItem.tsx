import { FC } from "react";
import { clsx } from "clsx";
import styles from "./style.module.css";
import { TaskStatusEnum } from "../../core/task/types";

export interface ITaskItemProps {
  clickHandler: () => void;
  id: number;
  cluster: string;
  status: TaskStatusEnum;
  title: string;
  isActive: boolean;
  statusTitle: string;
  isUser: boolean;
  data: string;
  fire: boolean;
}

const TaskItem: FC<ITaskItemProps> = (props) => {
  const {
    clickHandler,
    title,
    isActive,
    statusTitle,
    status,
    data,
    isUser,
    id,
    cluster,
    fire,
  } = props;

  return (
    <div
      className={clsx(styles.task, {
        [styles.active]: isActive,
        [styles.user]: isUser,
        [styles.fire]: !isUser && fire,
      })}
      onClick={clickHandler}
      tabIndex={0}
    >
      <p className={styles.text}>
        {title} #{id}
      </p>
      <p
        className={clsx(styles.pill, {
          [styles.normal]: status === TaskStatusEnum.Draft,
          [styles.progress]: status === TaskStatusEnum.InProgress,
          [styles.completed]: status === TaskStatusEnum.Completed,
        })}
      >
        {statusTitle}
      </p>
      <p className={styles.commontext}>{data}</p>
      <p className={styles.commontext}>{cluster}</p>
    </div>
  );
};

export default TaskItem;
