import { FC } from "react";
import { clsx } from "clsx";
import styles from "./style.module.css";
import { useTranslation } from "react-i18next";

interface ITaskItemProps {
  clickHandler: () => void;
  id: number;
  cluster: string;
  title: string;
  isActive: boolean;
  statusTitle: string;
  isUser: boolean;
  data: string;
}

const TaskItem: FC<ITaskItemProps> = (props) => {
  const {
    clickHandler,
    title,
    isActive,
    statusTitle,
    data,
    isUser,
    id,
    cluster,
  } = props;
  const { t } = useTranslation();

  return (
    <div
      className={clsx(styles.task, {
        [styles.active]: isActive,
        [styles.user]: isUser,
      })}
      onClick={clickHandler}
      tabIndex={0}
    >
      <p className={styles.text}>
        <span>
          {title} #{id}
        </span>
      </p>
      <p className={styles.info}>
        <span>{t("common.Status")}: </span>
        {statusTitle}
      </p>
      <p className={styles.info}>
        <span>{t("components.cluster.typeCluster")}:</span> {cluster}
      </p>
      <p className={styles.info}>
        <span>{t("common.Data")}:</span> {data}
      </p>
    </div>
  );
};

export default TaskItem;
