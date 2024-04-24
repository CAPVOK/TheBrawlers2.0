import { useEffect, useState } from "react";
import { Button, IButtonProps } from "../../components/UI";
import { useCases } from "../../store/casesSlice";
import { useTasks } from "../../store/tasksSlice";
import styles from "./styles.module.css";
import { ITask } from "../../core/task/types";
import { getTaskById } from "../../core/task/layer";
function MainPageContent() {
  const [taskData, setTaskData] = useState<ITask>();

  const { activeTask, closeTask } = useTasks();
  const { closeCase } = useCases();

  useEffect(() => {
    if (activeTask !== -1) {
      getTaskById(activeTask).then((data) => {
        setTaskData(data);
      });
    }
  }, [activeTask]);

  const closeButtonProps: IButtonProps = {
    onClick: () => {
      closeTask();
      closeCase();
    },
    label: "Закрыть",
    color: "error",
  };

  if (activeTask === -1) {
    return <div></div>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.nav}>
        <Button {...closeButtonProps} />
      </div>
      {taskData ? (
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
