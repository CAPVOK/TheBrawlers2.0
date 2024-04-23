import { useState } from "react";
import { Button, IButtonProps } from "../../components/UI";
import { useCases } from "../../store/casesSlice";
import { useTasks } from "../../store/tasksSlice";
import styles from "./styles.module.css";
function MainPageContent() {
  const [tasks] = useState([
    { id: 0, title: "Не работает отправка уведомлений" },
    { id: 1, title: "Не работает отправка оплата" },
    { id: 3, title: "Не работает отправка уведомлений" },
    { id: 4, title: "Не работает отправка оплата" },
    { id: 5, title: "Не работает отправка жопа" },
    { id: 6, title: "Не работает отправка уведомлений" },
    { id: 7, title: "Не работает отправка оплата" },
    { id: 8, title: "Не работает отправка жопа" },
    { id: 9, title: "Не работает отправка уведомлений" },
    { id: 10, title: "Не работает отправка оплата" },
    { id: 11, title: "Не работает отправка жопа" },
    { id: 12, title: "Не работает отправка оплата" },
    { id: 13, title: "Не работает отправка жопа last" },
  ]);

  const { activeTask, closeTask } = useTasks();
  const { closeCase } = useCases();

  const closeButtonProps: IButtonProps = {
    onClick: () => {
      closeTask();
      closeCase();
    },
    label: "Закрыть",
    color: "error",
  };

  const taskData = tasks.find((task) => task.id === activeTask);

  if (activeTask === -1) {
    return <div></div>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.nav}>
        <Button {...closeButtonProps} />
      </div>
      <div className={styles.content}>
        {taskData ? <p>{taskData.title}</p> : <p>Загрузка</p>}
      </div>
    </div>
  );
}

export { MainPageContent };
