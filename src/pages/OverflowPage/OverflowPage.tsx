import { clsx } from "clsx";
import styles from "./styles.module.css";
import { SidebarCluster } from "../../modules/Sidebar/SidebarCluster";
import { Navbar } from "../../components";
import CasesBar from "../../modules/CasesBar/CasesBar";
import { MainPageContent } from "../../modules/MainPageContent/MainPageContent";
import { useTasks } from "../../store/tasksSlice";
import { FC } from "react";

export const OverflowPage: FC = () => {
  const { activeTask } = useTasks();
  return (
    <div className={styles.page}>
      <Navbar />
      <div className={clsx(styles.body, { [styles.open]: activeTask !== -1 })}>
        <SidebarCluster />
        <MainPageContent />
        <CasesBar />
      </div>
    </div>
  );
};
