import { useEffect, useRef, useState } from "react";
import { Button as UIButton } from "../../components/UI";
import { useCases } from "../../store/casesSlice";
import { useTasks } from "../../store/tasksSlice";
import { clsx } from "clsx";
import styles from "./styles.module.css";
import { ITask, TaskStatusEnum } from "../../core/task/types";
import { Button } from "@mantine/core";
import {
  removeCaseFromTaskByTaskID,
  addSolutionToTask,
  changeTaskStatusById,
  getTaskById,
  removeSolutionFromTaskByTaskID,
} from "../../core/task/layer";
import { useTranslation } from "react-i18next";
import { Textarea, ActionIcon } from "@mantine/core";
import { IconTrash, IconX } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { RoutesEnum } from "../../app/routes";
function MainPageContent() {
  const [taskData, setTaskData] = useState<ITask>();
  const [isPageLoading, setPageLoading] = useState(true);
  const [isButtonsLoading, setButtonsLoading] = useState(false);
  const [solution, setSolution] = useState("");
  const [isEditContent, setEditContent] = useState(false);

  const prevTask = useRef<number | null>(null);

  const { t } = useTranslation();

  const { activeTask, closeTask, changeActiveTask, draftTasks, activeTasks } =
    useTasks();
  const { closeCase } = useCases();

  const getTask = async (activeTask: number) => {
    getTaskById(activeTask)
      .then((data) => {
        setTaskData(data);
      })
      .finally(() => {
        prevTask.current = activeTask;
        setPageLoading(false);
      });
  };

  useEffect(() => {
    if (activeTask !== -1) {
      if (
        !prevTask.current ||
        prevTask.current === -1 ||
        prevTask.current !== activeTask
      ) {
        const timer = setTimeout(() => {
          setTaskData(undefined);
          setPageLoading(true);
        }, 1000);
        getTask(activeTask).finally(() => {
          clearTimeout(timer);
        });
      } else {
        getTask(activeTask);
      }
    }
  }, [activeTask, draftTasks, activeTasks]);

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

  const handleCancelSolution = () => {
    removeSolutionFromTaskByTaskID(activeTask).then(() => {
      if (activeTask !== -1) {
        getTask(activeTask);
      }
    });
  };

  const handleCancelCase = () => {
    removeCaseFromTaskByTaskID(activeTask).then(() => {
      if (activeTask !== -1) {
        getTask(activeTask);
      }
    });
  };

  const updateButtonClick = async () => {
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
  };

  function getTime(time: string) {
    const date = new Date(time);
    return date.toLocaleString();
  }

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

  const isTaskDraft = !!taskData && taskData.status === TaskStatusEnum.Draft;
  const isUpdateButtonDisabled =
    isButtonsLoading ||
    isPageLoading ||
    !taskData ||
    taskData.status === TaskStatusEnum.Completed;

  const isSolution = !!taskData && taskData.solution;

  const isAddSolutionBlock =
    !!taskData && taskData.status === TaskStatusEnum.InProgress && !isSolution;

  if (activeTask === -1) {
    return <div className={styles.nodata}>{t("pages.noTasks")}</div>;
  }

  return (
    <div className={styles.main}>
      <div className={styles["scroll-content"]}>
        <div className={styles.nav}>
          <Button
            color={isTaskDraft ? "cyan" : "green"}
            disabled={isUpdateButtonDisabled}
            onClick={updateButtonClick}
          >
            {isTaskDraft ? t("pages.takeTask") : t("pages.Complete")}
          </Button>
          <ActionIcon
            size={"xl"}
            color="var(--clr-error)"
            variant="subtle"
            onClick={() => {
              closeTask();
              closeCase();
            }}
          >
            <IconX />
          </ActionIcon>
        </div>
        {!isPageLoading && taskData ? (
          <div className={styles.content}>
            <div className={styles.attributes}>
              <h2 className={styles.title}>{taskData.title}</h2>
              <p className={styles.description}>{taskData.description}</p>
            </div>
            <div className={styles.properties}>
              <div>
                <label>Статус</label>
                <label
                  className={clsx(styles.pill, {
                    [styles.normal]: taskData.status === TaskStatusEnum.Draft,
                    [styles.progress]:
                      taskData.status === TaskStatusEnum.InProgress,
                    [styles.completed]:
                      taskData.status === TaskStatusEnum.Completed,
                  })}
                >
                  {getStatus(taskData.status)}
                  <p>{getStatus(taskData.status)}</p>
                </label>
              </div>
              <div>
                <label>Исполнитель</label>
                <p>{taskData.user.email}</p>
              </div>
              <div>
                <label>Время создания</label>
                <p>{getTime(taskData.created_at)}</p>
              </div>
              {taskData.formed_at && (
                <div>
                  <label>Время изменения</label>
                  <p>{getTime(taskData.formed_at)}</p>
                </div>
              )}
              {taskData.completed_at && (
                <div>
                  <label>Время завершения</label>
                  <p>{getTime(taskData.completed_at)}</p>
                </div>
              )}
            </div>
            {taskData.case?.title && (
              <div className={clsx(styles.block, styles["selected-solution"])}>
                <div>
                  <p className={styles.title}>{t("pages.selectedCase")}:</p>
                  <Link to={RoutesEnum.Stack}>
                    <p className={styles.solution}>{taskData.case.title}</p>
                  </Link>
                </div>
                <ActionIcon
                  onClick={handleCancelCase}
                  size={"lg"}
                  variant="subtle"
                  color="var(--clr-error)"
                >
                  <IconTrash />
                </ActionIcon>
              </div>
            )}
            {isSolution && (
              <div className={styles["solution-block"]}>
                <Button onClick={() => setEditContent(!isEditContent)}>
                  {isEditContent ? t("common.Cancel") : t("common.Edit")}
                </Button>

                {!isEditContent && (
                  <div className={styles["solution-block"]}>
                    <div className={styles.solutionHead}>
                      <p className={styles.title}>
                        {t("pages.selectedSolution")}
                      </p>
                      <UIButton
                        label={t("common.CancelSolution")}
                        color="primary"
                        onClick={handleCancelSolution}
                      />
                    </div>
                    <p className={styles.solution}>{taskData.solution}</p>
                  </div>
                )}
              </div>
            )}
            {isAddSolutionBlock && (
              <div className={styles.sendForm}>
                <Textarea
                  label={t("components.case.Solution")}
                  withAsterisk
                  placeholder={t("components.case.AddSolutionText")}
                  value={isEditContent ? taskData.solution : solution}
                  onChange={(e) => setSolution(e.target.value)}
                  autosize
                  minRows={3}
                  maxRows={6}
                />
                <UIButton
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
    </div>
  );
}

export { MainPageContent };
