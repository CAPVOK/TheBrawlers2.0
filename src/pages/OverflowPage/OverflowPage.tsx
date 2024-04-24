import { clsx } from "clsx";
import styles from "./styles.module.css";
import { SidebarCluster } from "../../modules/Sidebar/SidebarCluster";
import { Navbar } from "../../components";
import { useTasks } from "../../store/tasksSlice";
import { FC } from "react";
import { OverflowContent } from "../../modules/OverflowContent/OverflowContent";

export const OverflowPage: FC = () => {
  const { activeTask } = useTasks();
  return (
    <div className={styles.page}>
      <Navbar />
      <div className={clsx(styles.body, { [styles.open]: activeTask !== -1 })}>
        <SidebarCluster />
        <OverflowContent />
      </div>
    </div>
  );
};
