import { useEffect, useState } from "react";
import { CaseItem } from "../../components";
import { useCases } from "../../store/casesSlice";
import styles from "./styles.module.css";
import { useTasks } from "../../store/tasksSlice";
import { useTranslation } from "react-i18next";
import { ICase } from "../../core/case/types";
import { getCasesByCluster } from "../../core/case/layer";
import { ICluster } from "../../store/clasterSlice";

function CasesBar() {
  const { t } = useTranslation();

  const [cases, setCases] = useState<ICase[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { activeTask, draftTasks, activeTasks } = useTasks();
  const { activeCase, changeActiveCase, closeCase } = useCases();

  async function getCasesByClusterDebounce(cluster: ICluster["id"]) {
    const loadingTimer = setTimeout(() => setIsLoading(true), 1000);
    await getCasesByCluster(cluster).then((cases) => {
      if (cases) {
        setCases(cases);
      }
    });

    clearTimeout(loadingTimer);
    setIsLoading(false);
  }

  const allTasks = [...draftTasks, ...activeTasks];
  const taskData = allTasks.find((task) => task.id === activeTask);

  useEffect(() => {
    if (taskData) {
      getCasesByClusterDebounce(taskData.cluster.id);
    }
  }, [activeTask, taskData]);

  /* useEffect(() => {
    if (!taskData) {
      return;
    }
    if (activeCase === -1) {
      setCases([]);
    }
    const intervalId = setInterval(() => {
      getCasesByCluster(taskData.cluster.id).then((cases) => {
        if (cases) {
          setCases(cases);
        }
      });
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [activeCase, activeTask, taskData]); */

  const handleCaseClick = (id: number) => {
    if (activeCase === id) {
      closeCase();
      return;
    }
    changeActiveCase(id);
  };

  const hadleCaseButtonClick = (id: number) => {
    console.log(id); /* todo */
  };

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>{t("components.case.Solutions")}</h2>
      <div className={styles["scroll-block"]}>
        {isLoading ? (
          <div className={styles.loading}>
            <p>{t("common.Loading")}</p>
          </div>
        ) : (
          <div className={styles.content}>
            {cases.map((item) => (
              <CaseItem
                key={item.id}
                title={item.title}
                text={item.solution}
                clickCardHandler={() => handleCaseClick(item.id)}
                clickButtonHandler={() => hadleCaseButtonClick(item.id)}
                isActive={activeCase === item.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CasesBar;
