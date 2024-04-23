import { create } from "zustand";

export type TasksState = {
  activeTask: number;
};

export type TasksActions = {
  changeActiveTask: (taskId: number) => void;
  closeTask: () => void;
};

const initialState: TasksState = {
  activeTask: -1,
};

export const useTasks = create<TasksActions & TasksState>((set) => ({
  ...initialState,
  changeActiveTask: (task) => set({ activeTask: task }),
  closeTask: () => set({ activeTask: -1 }),
}));
