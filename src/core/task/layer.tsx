import { useTasks } from "../../store/tasksSlice";
import {
  changeTaskStatusRequest,
  getTaskByIdRequest,
  getTasksRequest,
} from "./requests";
import { TaskStatusEnum } from "./types";

export const getDraftTasks = async () => {
  const response = await getTasksRequest(TaskStatusEnum.Draft);
  const tasks = response.data;
  if (tasks) {
    useTasks.getState().updateDraftTasks(tasks);
  }
  return response.data;
};

export const getActiveTasks = async () => {
  const response = await getTasksRequest(TaskStatusEnum.InProgress);
  const tasks = response.data;
  if (tasks) {
    useTasks.getState().updateActiveTasks(tasks);
  }
  return response.data;
};

/* export const getCompletedTasks = async () => {
  const response = await getTasksRequest(TaskStatusEnum.Completed);
  return response.data;
}; */

export const getTaskById = async (id: number) => {
  const response = await getTaskByIdRequest(id);
  return response.data;
};

export const changeTaskStatusById = async (id: number) => {
  const response = await changeTaskStatusRequest(id);
  return response.data;
};
