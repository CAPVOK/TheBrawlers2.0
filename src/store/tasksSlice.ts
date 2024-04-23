import { create } from "zustand";

export enum TaskStatusEnum {
  Draft,
  InProgress,
  Completed,
}
export interface ITask {
  id: number;
  title: string;
  desc: string;
  status: TaskStatusEnum;
  email?: string;
  caseId?: number;
  cluster?: number;
}

export type TasksState = {
  activeTask: ITask["id"];
  tasks: ITask[];
};

export type TasksActions = {
  changeActiveTask: (taskId: number) => void;
  closeTask: () => void;
  updateTasks: (tasks: ITask[]) => void;
};

const initialState: TasksState = {
  activeTask: -1,
  tasks: [],
};

export const useTasks = create<TasksActions & TasksState>((set) => ({
  ...initialState,
  changeActiveTask: (task) => set({ activeTask: task }),
  closeTask: () => set({ activeTask: -1 }),
  updateTasks: (tasks) => set({ tasks }),
}));
