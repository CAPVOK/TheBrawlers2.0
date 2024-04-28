import { clsx } from "clsx";
import styles from "./styles.module.css";
import { Sidebar } from "../../modules/Sidebar/Sidebar";
import { Navbar } from "../../components";
import CasesBar from "../../modules/CasesBar/CasesBar";
import { MainPageContent } from "../../modules/MainPageContent/MainPageContent";
import { useTasks } from "../../store/tasksSlice";
import { useEffect } from "react";

const MainPage = () => {
  const { activeTask } = useTasks();

  useEffect(() => {
    const resizableBlock = document.getElementById("resizableBlock");
    let isResizing = false;
    let prevX = 0;
    if (!resizableBlock) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (isResizing) {
        const deltaX = event.clientX - prevX;
        const newWidth = resizableBlock.offsetWidth - deltaX;
        resizableBlock.style.width = `${newWidth}px`;
        prevX = event.clientX;
      }
    };
    const handleMouseDown = (event: MouseEvent) => {
      isResizing = true;
      prevX = event.clientX;
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseUp = () => {
      isResizing = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    resizableBlock.addEventListener("mousedown", handleMouseDown);

    return () => {
      resizableBlock.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={clsx(styles.body, { [styles.open]: activeTask !== -1 })}>
        <Sidebar />
        <MainPageContent />
        <div className={styles.resizableBlock} id="resizableBlock">
          <CasesBar />
        </div>
      </div>
    </div>
  );
};

export { MainPage };
