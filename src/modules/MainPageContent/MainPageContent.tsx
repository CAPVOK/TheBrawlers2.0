import { useEffect, useState } from "react";
import { Button, IButtonProps } from "../../components/UI";
import { useCases } from "../../store/casesSlice";
import { useTasks } from "../../store/tasksSlice";
import styles from "./styles.module.css";
import { ITask, TaskStatusEnum } from "../../core/task/types";
import { changeTaskStatusById, getTaskById } from "../../core/task/layer";
import { useTranslation } from "react-i18next";
function MainPageContent() {
  const [taskData, setTaskData] = useState<ITask>();
  const [isPageLoading, setPageLoading] = useState(false);
  const [isButtonsLoading, setButtonsLoading] = useState(false);

  const { t } = useTranslation();

  const { activeTask, closeTask, changeActiveTask } = useTasks();
  const { closeCase } = useCases();

  const getTask = async (activeTask: number) => {
    const timer = setTimeout(() => setPageLoading(true), 1200);
    await getTaskById(activeTask).then((data) => {
      setTaskData(data);
    });
    clearTimeout(timer);
    setPageLoading(false);
  };

  useEffect(() => {
    if (activeTask !== -1) {
      getTask(activeTask);
    }
  }, [activeTask]);

  const closeButtonProps: IButtonProps = {
    onClick: () => {
      closeTask();
      closeCase();
    },
    label: t("common.Close"),
    color: "error",
  };

  const updateButtonProps: IButtonProps = {
    onClick: async () => {
      if (!taskData) return;
      setButtonsLoading(true);
      await changeTaskStatusById(taskData.id)
        .then((data) => setTaskData(data))
        .then(() => {
          if (taskData.status === TaskStatusEnum.InProgress) {
            changeActiveTask(-1);
          }
        });
      setButtonsLoading(false);
    },
    disabled: isButtonsLoading || isPageLoading,
    label:
      taskData && taskData.status === TaskStatusEnum.Draft
        ? t("pages.takeTask")
        : t("pages.Complete"),
    color:
      taskData && taskData.status === TaskStatusEnum.Draft
        ? "primary"
        : "success",
  };

  if (activeTask === -1) {
    return <div className={styles.nodata}>{t("pages.noTasks")}</div>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.nav}>
        {taskData && taskData.status !== TaskStatusEnum.Completed && (
          <Button {...updateButtonProps} />
        )}
        <Button {...closeButtonProps} />
      </div>
      {!isPageLoading && taskData ? (
        <div className={styles.content}>
          <h2>{taskData.title}</h2>
          <p>{taskData.description}</p>
        </div>
      ) : (
        <p>Загрузка</p>
      )}
    </div>
  );
}

export { MainPageContent };
