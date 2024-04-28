import { getUsersRequest, tasksByUserIdRequest } from "./requests";
import { IUser } from "./types";

export const getUsers = async () => {
  const response = await getUsersRequest();
  return response.data;
};

export const tasksByUserId = async (id: IUser) => {
  const response = await tasksByUserIdRequest(id);
  return response.data;
};
