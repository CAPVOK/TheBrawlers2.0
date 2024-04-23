import { TaskItem } from "../../components";
import { useTasks } from "../../store/tasksSlice";
import styles from "./styles.module.css";

function Sidebar() {
  const tasks = [
    { id: 0, title: "Не работает отправка уведомлений" },
    { id: 1, title: "Не работает отправка оплата" },
    { id: 2, title: "Не работает отправка жопа" },
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
    { id: 13, title: "Не работает отправка жопа" },
  ]; // todo

  const { activeTask, changeActiveTask } = useTasks();
  const hadleTaskClick = (id: number) => {
    changeActiveTask(id);
  };
  return (
    <div className={styles.sidebar}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          title={task.title}
          clickHandler={() => hadleTaskClick(task.id)}
          isActive={activeTask === task.id}
        />
      ))}
    </div>
  );
}

export { Sidebar };
