import { FC } from "react";
import styles from "./style.module.css";

interface ITaskItemProps {
  clickHandler: () => void;
  title: string;
  isActive: boolean;
}

const TaskItem: FC<ITaskItemProps> = (props) => {
  const { clickHandler, title } = props;
  return (
    <div className={styles.task} onClick={clickHandler}>
      {title}
    </div>
  );
};

export default TaskItem;
