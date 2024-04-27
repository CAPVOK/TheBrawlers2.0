import { useEffect, useRef, useState } from "react";
import { CaseItem, SkeletonItem } from "../../components";
import { useCases } from "../../store/casesSlice";
import styles from "./styles.module.css";
import { useTasks } from "../../store/tasksSlice";
import { useTranslation } from "react-i18next";
import { ICase } from "../../core/case/types";
import { getCasesByCluster } from "../../core/case/layer";
import { ICluster } from "../../core/cluster/types";
import { TaskStatusEnum } from "../../core/task/types";
import { addCasetoTask } from "../../core/task/layer";

function CasesBar() {
  const { t } = useTranslation();

  const [cases, setCases] = useState<ICase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddCaseLoadin, setCaseLoading] = useState(false);

  const { activeTask, draftTasks, activeTasks } = useTasks();
  const { activeCase, changeActiveCase, closeCase } = useCases();

  const prevTask = useRef<number | null>(null);

  /* async function getCasesByClusterDebounce(cluster: ICluster["id"]) {
    const loadingTimer = setTimeout(() => setIsLoading(true), 1000);
    await getCasesByCluster(cluster).then((cases) => {
      if (cases) {
        setCases(cases);
      } else {
        setCases([]);
      }
    });
    clearTimeout(loadingTimer);
    setIsLoading(false);
  } */

  async function getCasesByClusterDebounce(cluster: ICluster["id"]) {
    setIsLoading(true);
    await getCasesByCluster(cluster).then((cases) => {
      if (cases) {
        setCases(cases);
      } else {
        setCases([]);
      }
    });
    setIsLoading(false);
  }

  const allTasks = [...draftTasks, ...activeTasks];
  const taskData = allTasks.find((task) => task.id === activeTask);

  useEffect(() => {
    if (taskData) {
      if (
        !prevTask.current ||
        prevTask.current === -1 ||
        prevTask.current !== taskData.cluster.id
      ) {
        getCasesByClusterDebounce(taskData.cluster.id).finally(() => {
          prevTask.current = taskData.cluster.id;
        });
      } else {
        getCasesByCluster(taskData.cluster.id)
          .then((cases) => {
            if (cases) {
              setCases(cases);
            } else {
              setCases([]);
            }
          })
          .finally(() => {
            prevTask.current = taskData.cluster.id;
          });
      }
    }
  }, [activeTask, taskData]);

  const handleCaseClick = (id: number) => {
    if (activeCase === id) {
      closeCase();
      return;
    }
    changeActiveCase(id);
  };

  const hadleCaseButtonClick = (caseId: number) => {
    if (taskData) {
      setCaseLoading(true);
      addCasetoTask(taskData.id, caseId).finally(() => setCaseLoading(false));
    }
  };

  const isContent = !!cases && !!cases.length;

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>{t("components.case.Solutions")}</h2>
      <div className={styles["scroll-block"]}>
        <div className={styles.content}>
          {isLoading ? (
            <>
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
            </>
          ) : isContent ? (
            cases.map((item) => (
              <CaseItem
                key={item.id}
                title={item.title}
                text={item.solution}
                clickCardHandler={() => handleCaseClick(item.id)}
                clickButtonHandler={() => hadleCaseButtonClick(item.id)}
                isActive={activeCase === item.id}
                disabled={
                  taskData?.status !== TaskStatusEnum.InProgress ||
                  isAddCaseLoadin ||
                  taskData.case?.id === activeCase
                }
              />
            ))
          ) : (
            <p>{t("pages.noCases")}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CasesBar;
