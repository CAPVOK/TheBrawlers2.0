import { useAdminUsers } from "../../store/adminSlice";
import { TaskStatusEnum } from "../task/types";
import { getUsersRequest, tasksByUserIdRequest } from "./requests";

export const getUsers = async () => {
  const response = await getUsersRequest();
  const adminUsers = response.data;
  useAdminUsers.getState().updateActiveAdminUsers(adminUsers || []);
  return adminUsers;
};

export const tasksByUserId = async (id: number, status: TaskStatusEnum) => {
  const response = await tasksByUserIdRequest(id, status);
  return response.data;
};