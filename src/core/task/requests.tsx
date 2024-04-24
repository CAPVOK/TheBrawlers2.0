import { AxiosResponse } from "axios";
import { taskApi } from "./api";

import { IGetTasksResponse, ITask, TaskStatusEnum } from "./types";

export const getTasksRequest = async (
  status: TaskStatusEnum
): Promise<AxiosResponse<IGetTasksResponse>> => {
  try {
    const response: AxiosResponse<IGetTasksResponse> = await taskApi.get(
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
