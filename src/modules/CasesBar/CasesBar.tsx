import { useEffect, useState } from "react";
import { CaseItem } from "../../components";
import { ICase, useCases } from "../../store/casesSlice";
import styles from "./styles.module.css";
import { useTasks } from "../../store/tasksSlice";

const CLUSTERS: { [key: number]: ICase[] } = {
  1: [
    {
      id: 0,
      title: "Не работает отправка уведомлений",
      desc: "Не работает отправка уведомлений Не работает отправка уведомлений",
    },
    {
      id: 1,
      title: "Не работает отправка оплата",
      desc: "Не работает отправка оплатаНе работает отправка оплатаНе работает отправка оплатаНе работает отправка оплата",
    },
    {
      id: 2,
      title: "Не работает отправка жопа",
      desc: " Не работает отправка жопа Не работает отправка жопа Не работает отправка жопа",
    },
    {
      id: 3,
      title: "Не работает отправка уведомлений",
      desc: "Не работает отправка уведомленийНе работает отправка уведомленийНе работает отправка уведомлений",
    },
  ],
  2: [
    {
      id: 4,
      title: "Не работает отправка оплата",
      desc: "Не работает отправка уведомленийНе работает отправка уведомлений",
    },
    {
      id: 5,
      title: "Не работает отправка жопа",
      desc: "Не работает отправка уведомленийНе работает отправка уведомленийНе работает отправка уведомленийНе работает отправка уведомлений",
    },
    {
      id: 6,
      title: "Не работает отправка уведомлений",
      desc: "Не работает отправка уведомлений",
    },
    {
      id: 7,
      title: "Не работает отправка оплата",
      desc: "Не работает отправка уведомленийНе работает отправка уведомленийНе работает отправка уведомленийНе работает отправка уведомленийНе работает отправка уведомленийНе работает отправка уведомлений",
    },
  ],
  3: [
    {
      id: 8,
      title: "Не работает отправка жопа",
      desc: "Не работает отправка уведомленийНе работает отправка уведомленийНе работает отправка уведомлений",
    },
    {
      id: 9,
      title: "Не работает отправка уведомлений",
      desc: "Не работает отправка уведомленийНе работает отправка уведомлений,",
    },
  ],
  4: [
    {
      id: 10,
      title: "Не работает отправка оплата",
      desc: "Не работает отправка уведомлений",
    },
    {
      id: 11,
      title: "Не работает отправка жопа",
      desc: "Не работает отправка уведомленийНе работает отправка уведомлений",
    },
    {
      id: 12,
      title: "Не работает отправка оплата",
      desc: "Не работает отправка уведомленийНе работает отправка уведомленийНе работает отправка уведомлений",
    },
    {
      id: 13,
      title: "Не работает отправка жопа last",
      desc: "Не работает отправка уведомленийНе работает отправка уведомленийНе работает отправка уведомленийНе работает отправка уведомлений",
    },
  ],
};

function CasesBar() {
  const [cases, setCases] = useState<ICase[]>([]);

  const { activeTask, tasks } = useTasks();
  const { activeCase, changeActiveCase } = useCases();

  // типа запроc
  useEffect(() => {
    const taskData = tasks.find((task) => task.id === activeTask);
    setCases([]);
    if (activeTask === -1 || !taskData) {
      return;
    }

    const timer = setTimeout(() => {
      setCases(taskData.cluster ? CLUSTERS[taskData.cluster] || [] : []);
    }, 1000);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [activeTask, tasks]);

  const handleCaseClick = (id: number) => {
    changeActiveCase(id);
  };
  return (
    <div className={styles.sidebar}>
      {cases.map((item) => (
        <CaseItem
          key={item.id}
          title={item.title}
          clickHandler={() => handleCaseClick(item.id)}
          isActive={activeCase === item.id}
        />
      ))}
    </div>
  );
}

export default CasesBar;
