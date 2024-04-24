import { useTasks } from "../../store/tasksSlice";
import { getTaskByIdRequest, getTasksRequest } from "./requests";
import { TaskStatusEnum } from "./types";

export const USER_TOKEN_KEY = "besthack_user_token";
export const USER_EMAIL_KEY = "besthack_email";

export const getDraftTasks = async () => {
  const response = await getTasksRequest(TaskStatusEnum.Draft);
  if (response.data.tasks) {
    useTasks.getState().updateDraftTasks(response.data.tasks);
  }
  return response.data;
};

export const getActiveTasks = async () => {
  const response = await getTasksRequest(TaskStatusEnum.InProgress);
  if (response.data.tasks) {
    useTasks.getState().updateActiveTasks(response.data.tasks);
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
