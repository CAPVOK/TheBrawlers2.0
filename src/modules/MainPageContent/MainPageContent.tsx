import { useEffect, useState } from "react";
import { Button, IButtonProps } from "../../components/UI";
import { useCases } from "../../store/casesSlice";
import { useTasks } from "../../store/tasksSlice";
import styles from "./styles.module.css";
import { ITask, TaskStatusEnum } from "../../core/task/types";
import {
  addSolutionToTask,
  changeTaskStatusById,
  getTaskById,
} from "../../core/task/layer";
import { useTranslation } from "react-i18next";
import { Textarea } from "@mantine/core";
function MainPageContent() {
  const [taskData, setTaskData] = useState<ITask>();
  const [isPageLoading, setPageLoading] = useState(false);
  const [isButtonsLoading, setButtonsLoading] = useState(false);
  const [solution, setSolution] = useState("");

  const { t } = useTranslation();

  const { activeTask, closeTask, changeActiveTask, draftTasks, activeTasks } =
    useTasks();
  const { closeCase } = useCases();

  const getTask = async (activeTask: number) => {
    const timer = setTimeout(() => setPageLoading(true), 1200);
    await getTaskById(activeTask).then((data) => {
      setTaskData(data);
    });
    clearTimeout(timer);
    setPageLoading(false);
  };

  /* const getTask = async (activeTask: number) => {
    setTaskData(undefined);
    setPageLoading(true);
    await getTaskById(activeTask).then((data) => {
      setTaskData(data);
    });
    setPageLoading(false);
  }; */

  useEffect(() => {
    if (activeTask !== -1) {
      getTask(activeTask);
    }
  }, [activeTask, draftTasks, activeTasks]);

  const closeButtonProps: IButtonProps = {
    onClick: () => {
      closeTask();
      closeCase();
    },
    label: t("common.Close"),
    color: "error",
  };

  const handleAddSolution = () => {
    addSolutionToTask({
      id: activeTask,
      solution: solution,
    }).then(() => {
      if (activeTask !== -1) {
        getTask(activeTask);
      }
    });
    setSolution("");
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
    disabled:
      isButtonsLoading ||
      isPageLoading ||
      !taskData ||
      taskData.status === TaskStatusEnum.Completed,
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

  const isTaskTaked =
    !!taskData && taskData.status === TaskStatusEnum.InProgress;

  return (
    <div className={styles.main}>
      <div className={styles.nav}>
        <Button {...updateButtonProps} />
        <Button {...closeButtonProps} />
      </div>
      {!isPageLoading && taskData ? (
        <div className={styles.content}>
          <h2>{taskData.title}</h2>
          <p>{taskData.description}</p>
          {taskData.case?.title && (
            <div className={styles["solution-block"]}>
              <p className={styles.title}>{t("pages.selectedSolution")}:</p>
              <p className={styles.solution}>{taskData.case.title}</p>
            </div>
          )}
          {taskData.solution && (
            <div className={styles["solution-block"]}>
              <p className={styles.title}>{t("pages.selectedSolution")}:</p>
              <p className={styles.solution}>{taskData.solution}</p>
            </div>
          )}
          {isTaskTaked && (
            <div className={styles.sendForm}>
              <Textarea
                label={t("components.case.Solution")}
                withAsterisk
                placeholder={t("components.case.AddSolutionText")}
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                autosize
                minRows={3}
                maxRows={6}
              />
              <Button
                label={t("components.case.AddCase")}
                color="success"
                fullWidth
                onClick={handleAddSolution}
              />
            </div>
          )}
        </div>
      ) : (
        <p className={styles.nodata}>{t("common.Loading")}</p>
      )}
    </div>
  );
}

export { MainPageContent };
