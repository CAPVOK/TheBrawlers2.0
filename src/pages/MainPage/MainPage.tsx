import { clsx } from "clsx";
import styles from "./styles.module.css";
import Sidebar from "../../framework";
import { Navbar, TaskItem } from "../../components";
import CasesBar from "../../modules/CasesBar/CasesBar";
import { MainPageContent } from "../../modules/MainPageContent/MainPageContent";
import { useTasks } from "../../store/tasksSlice";
import { useEffect } from "react";
import { ISidebarComonProps } from "../../framework/typing";
import { BASE_REST_URL, USER_TOKEN_KEY } from "../../core/constants";
import { ITaskItemProps } from "../../components/TaskItem/TaskItem";
import { ITask } from "../../core/task/types";

const MainPage = () => {
  const { activeTask } = useTasks();

  useEffect(() => {
    const resizableBlock = document.getElementById("resizableBlock");
    const resizableSlider = document.getElementById("resizableSlider");
    let isResizing = false;
    let prevX = 0;
    if (!resizableBlock || !resizableSlider) return;

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

    resizableSlider.addEventListener("mousedown", handleMouseDown);

    return () => {
      resizableSlider.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  const token = localStorage.getItem(USER_TOKEN_KEY);

  const rebaseFunction = (data: ITask): ITaskItemProps => {
    const props: ITaskItemProps = {
      clickHandler: function (): void {
        throw new Error("Function not implemented.");
      },
      id: data.id,
      cluster: data.cluster.name,
      status: data.status,
      title: data.title,
      isActive: false,
      statusTitle: "",
      isUser: !!data.user.email,
      data: new Date(data.created_at).toLocaleString(),
      fire: data.fire,
    };
    return props;
  };

  const props: ISidebarComonProps<ITaskItemProps, ITask> = {
    item: TaskItem,
    skeletons: { length: 5 },
    url: BASE_REST_URL + "/task/?status=0",
    requestConfig: { headers: { Authorization: `Bearer ${token}` } },
    rebaseFunction,
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={clsx(styles.body, { [styles.open]: activeTask !== -1 })}>
        <Sidebar {...props} />
        <MainPageContent />
        <div className={styles.resizableBlock} id="resizableBlock">
          <div className={styles.slider} id="resizableSlider" />
          <CasesBar />
        </div>
      </div>
    </div>
  );
};

export { MainPage };
