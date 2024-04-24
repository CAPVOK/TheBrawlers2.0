import { clsx } from "clsx";
import styles from "./styles.module.css";
import { Sidebar } from "../../modules/Sidebar/Sidebar";
import { Navbar } from "../../components";
import CasesBar from "../../modules/CasesBar/CasesBar";
import { MainPageContent } from "../../modules/MainPageContent/MainPageContent";
import { useTasks } from "../../store/tasksSlice";

export const MainPage = () => {
  const { activeTask } = useTasks();
  return (
    <div className={styles.page}>
      <Navbar />
      <div className={clsx(styles.body, { [styles.open]: activeTask !== -1 })}>
        <Sidebar/>
        <MainPageContent />
        <CasesBar />
      </div>
    </div>
  );
};
