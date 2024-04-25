import { AxiosResponse } from "axios";
import { taskApi } from "./api";

import { GetTasksResponseType, ITask, TaskStatusEnum } from "./types";
import { ICase } from "../case/types";

export const getTasksRequest = async (
  status: TaskStatusEnum
): Promise<AxiosResponse<GetTasksResponseType>> => {
  try {
    const response: AxiosResponse<GetTasksResponseType> = await taskApi.get(
      `/task/?status=${status}`
    );
    return response;
  } catch (error) {
    console.error("Ошибка получения данных:", error);
    throw error;
  }
};

export const getTaskByIdRequest = async (
  id: number
): Promise<AxiosResponse<ITask>> => {
  try {
    const response: AxiosResponse<ITask> = await taskApi.get(`/task/${id}`);
    return response;
  } catch (error) {
    console.error("Ошибка получения данных:", error);
    throw error;
  }
};

export const changeTaskStatusRequest = async (
  id: number
): Promise<AxiosResponse<ITask>> => {
  try {
    const response: AxiosResponse<ITask> = await taskApi.post(
      `/task/${id}/status`
    );
    return response;
  } catch (error) {
    console.error("Ошибка изменения данных:", error);
    throw error;
  }
};

export const addCasetoTaskRequest = async (
  taskId: ITask["id"],
  caseId: ICase["id"]
): Promise<AxiosResponse<unknown>> => {
  try {
    const response: AxiosResponse<unknown> = await taskApi.put(
      `/task/${taskId}/case/${caseId}`
    );
    return response;
  } catch (error) {
    console.error("Ошибка изменения данных:", error);
    throw error;
  }
};
