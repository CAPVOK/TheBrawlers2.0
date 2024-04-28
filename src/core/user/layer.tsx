import { TaskStatusEnum } from "../task/types";
import { getUsersRequest, tasksByUserIdRequest } from "./requests";

export const getUsers = async () => {
  const response = await getUsersRequest();
  return response.data;
};

export const tasksByUserId = async (id: number, status: TaskStatusEnum) => {
  const response = await tasksByUserIdRequest(id, status);
  return response.data;
};
