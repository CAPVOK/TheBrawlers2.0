import { useEffect } from "react";
import { TaskItem } from "../../components";
import { useTasks } from "../../store/tasksSlice";
import styles from "./styles.module.css";
import { useCases } from "../../store/casesSlice";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../store/authSlice";
import { getActiveTasks, getDraftTasks } from "../../core/task/layer";
import { TaskStatusEnum } from "../../core/task/types";

function Sidebar() {
  const { t } = useTranslation();

  /* const [isLoading, setIsLoading] = useState(true); */

  const { userName } = useAuth();
  const { activeTask, changeActiveTask, draftTasks, activeTasks } = useTasks();
  const { closeCase } = useCases();

  const tasks = [...activeTasks, ...draftTasks];

  async function getTasks() {
    getDraftTasks();
    getActiveTasks();
  }

  /* async function getTasks() {
    let draftLoading = true;
    let activeLoading = true;
    await Promise.all([
      getDraftTasks().then(() => {
        draftLoading = false;
      }),
      getActiveTasks().then(() => {
        activeLoading = false;
      }),
    ]);
    setIsLoading(draftLoading && activeLoading);
  } */

  useEffect(() => {
    getTasks();
    const intervalId = setInterval(() => {
      getTasks();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // типа запроc
  /* useEffect(() => {
    const timer = setTimeout(() => {
      updateTasks(
        TASKS.filter((task) => {
          if (task.email) {
            if (task.email !== userName) return false;
          }
          return true;
        }).sort((taskA, taskB) => {
          if (taskA.email === userName && taskB.email !== userName) {
            return -1;
          } else if (taskA.email !== userName && taskB.email === userName) {
            return 1;
          } else {
            return 0;
          }
        })
      );
    }, 1000);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); */

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

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>{t("components.task.Tasks")}</h2>
      <div className={styles["scroll-block"]}>
        <div className={styles.content}>
          {!!tasks.length &&
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                title={task.title}
                clickHandler={() => hadleTaskClick(task.id)}
                isActive={activeTask === task.id}
                statusTitle={getStatus(task.status)}
                isUser={userName === task.email}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export { Sidebar };
