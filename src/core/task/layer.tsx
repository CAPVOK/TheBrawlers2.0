import { useTasks } from "../../store/tasksSlice";
import { ICase } from "../case/types";
import {
  addCasetoTaskRequest,
  changeTaskStatusRequest,
  getTaskByIdRequest,
  getTasksRequest,
} from "./requests";
import { ITask, TaskStatusEnum } from "./types";

export const getDraftTasks = async () => {
  const response = await getTasksRequest(TaskStatusEnum.Draft);
  const tasks = response.data;
  useTasks.getState().updateDraftTasks(tasks || []);
  return response.data;
};

export const getActiveTasks = async () => {
  const response = await getTasksRequest(TaskStatusEnum.InProgress);
  const tasks = response.data;
  useTasks.getState().updateActiveTasks(tasks || []);
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

export const addCasetoTask = async (
  taskId: ITask["id"],
  caseId: ICase["id"]
) => {
  const response = await addCasetoTaskRequest(taskId, caseId);
  return response.data;
};
