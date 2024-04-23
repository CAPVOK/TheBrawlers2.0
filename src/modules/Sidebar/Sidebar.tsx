import { useEffect } from "react";
import { TaskItem } from "../../components";
import { ITask, TaskStatusEnum, useTasks } from "../../store/tasksSlice";
import styles from "./styles.module.css";
import { useCases } from "../../store/casesSlice";

const TASKS: ITask[] = [
  {
    id: 0,
    title: "Не работает отправка уведомлений",
    desc: "",
    cluster: 1,
    status: TaskStatusEnum.Draft,
  },
  {
    id: 1,
    title: "Не работает отправка оплата",
    desc: "",
    cluster: 2,
    status: TaskStatusEnum.Draft,
  },
  {
    id: 2,
    title: "Не работает отправка жопа",
    desc: "",
    cluster: 3,
    status: TaskStatusEnum.Draft,
  },
  {
    id: 3,
    title: "Не работает отправка уведомлений",
    desc: "",
    cluster: 4,
    status: TaskStatusEnum.Draft,
  },
  {
    id: 4,
    title: "Не работает отправка оплата",
    desc: "",
    cluster: 1,
    status: TaskStatusEnum.Draft,
  },
  {
    id: 5,
    title: "Не работает отправка жопа",
    desc: "",
    cluster: 2,
    status: TaskStatusEnum.Draft,
  },
  {
    id: 6,
    title:
      "Не работает отправка уведомлений отправка уведомлений отправка уведомлений отправка уведомлений",
    desc: "",
    cluster: 3,
    status: TaskStatusEnum.Draft,
  },
  {
    id: 7,
    title: "Не работает отправка оплата",
    desc: "",
    cluster: 4,
    status: TaskStatusEnum.Draft,
  },
  {
    id: 8,
    title: "Не работает отправка жопа",
    desc: "",
    cluster: 1,
    status: TaskStatusEnum.Draft,
  },
  {
    id: 9,
    title: "Не работает отправка уведомлений",
    desc: "",
    cluster: 2,
    status: TaskStatusEnum.Draft,
  },
  {
    id: 10,
    title: "Не работает отправка оплата",
    desc: "",
    cluster: 3,
    status: TaskStatusEnum.Draft,
  },
  {
    id: 11,
    title: "Не работает отправка жопа",
    desc: "",
    cluster: 4,
    status: TaskStatusEnum.Draft,
  },
  {
    id: 12,
    title: "Не работает отправка оплата",
    desc: "",
    cluster: 1,
    status: TaskStatusEnum.Draft,
  },
  {
    id: 13,
    title: "Не работает отправка жопа last",
    desc: "",
    cluster: 2,
    status: TaskStatusEnum.Draft,
  },
]; // todo

function Sidebar() {
  const { activeTask, changeActiveTask, tasks, updateTasks } = useTasks();
  const { closeCase } = useCases();

  // типа запроc
  useEffect(() => {
    const timer = setTimeout(() => {
      updateTasks(TASKS);
    }, 1000);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hadleTaskClick = (id: number) => {
    changeActiveTask(id);
    closeCase();
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
