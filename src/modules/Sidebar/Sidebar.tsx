import { useEffect, useState } from "react";
import { SkeletonItem, TaskItem } from "../../components";
import { useTasks } from "../../store/tasksSlice";
import styles from "./styles.module.css";
import { useCases } from "../../store/casesSlice";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../store/authSlice";
import { getActiveTasks, getDraftTasks } from "../../core/task/layer";
import { TaskStatusEnum } from "../../core/task/types";

function Sidebar() {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const { userName } = useAuth();
  const { activeTask, changeActiveTask, draftTasks, activeTasks } = useTasks();
  const { closeCase } = useCases();

  const tasks = [...activeTasks, ...draftTasks];

  /* async function getTasksWithDebounce() {
    const loadingTimer = setTimeout(() => setIsLoading(true), 1000);
    try {
      await getDraftTasks();
      await getActiveTasks();
    } finally {
      clearTimeout(loadingTimer);
      setIsLoading(false);
    }
  } */

  async function getTasksWithDebounce() {
    setIsLoading(true);
    try {
      await getDraftTasks();
      await getActiveTasks();
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getTasksWithDebounce();
    const intervalId = setInterval(() => {
      getDraftTasks();
      getActiveTasks();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function getStatus(status?: TaskStatusEnum) {
    switch (status) {
      case TaskStatusEnum.Draft:
        return t("components.task.status.draft");
      case TaskStatusEnum.InProgress:
        return t("components.task.status.progress");
      default:
        return t("components.task.status.draft");
    }
  }

  const hadleTaskClick = (id: number) => {
    changeActiveTask(id);
    closeCase();
  };

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    
    date.setHours(date.getHours() + 3);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "UTC",
    };

    return date.toLocaleString("ru-RU", options);
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t("components.task.Tasks")}</h2>
      </div>
      <div className={styles["scroll-block"]}>
        <div className={styles.content}>
          {isLoading ? (
            <>
              <SkeletonItem height="5rem" />
              <SkeletonItem height="5rem" />
              <SkeletonItem height="5rem" />
              <SkeletonItem height="5rem" />
              <SkeletonItem height="5rem" />
              <SkeletonItem height="5rem" />
            </>
          ) : (
            !!tasks.length &&
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                status={task.status}
                title={task.title}
                id={task.id}
                fire={task.fire}
                cluster={task.cluster.name}
                data={formatDate(task.created_at)}
                clickHandler={() => hadleTaskClick(task.id)}
                isActive={activeTask === task.id}
                statusTitle={getStatus(task.status)}
                isUser={userName === task.user.email}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export { Sidebar };
