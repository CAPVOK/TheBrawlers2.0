import { AxiosResponse } from "axios";
import { userApi } from "./api";
import { notifications } from "@mantine/notifications";
import { t } from "i18next";
import classes from "../notifications.module.css";
import { ITask, TaskStatusEnum } from "../task/types";
import { GetAdminUsersType } from "../../store/adminSlice";

export const getUsersRequest = async (): Promise<
  AxiosResponse<GetAdminUsersType>
> => {
  try {
    const response: AxiosResponse<GetAdminUsersType> = await userApi.get(
      `/user/`
    );
    return response;
  } catch (error) {
    console.error("Error getting users", error);
    notifications.show({
      color: "red",
      title: t("common.Error"),
      message: t("notifications.tasks.GetUsers"),
      classNames: classes,
    });
    throw error;
  }
};

export const tasksByUserIdRequest = async (
  id: number,
  status: TaskStatusEnum
): Promise<AxiosResponse<ITask[]>> => {
  try {
    const response: AxiosResponse<ITask[]> = await userApi.get(
      `/user/${id}/tasks/?status=${status}`
    );
    // notifications.show({
    //     color: "green",
    //     title: t("common.Success"),
    //     message: t("notifications.users.GetTasksSuccessful"),
    //     classNames: classes,
    //   });
    return response;
  } catch (error) {
    console.error("Error getting tasks by user id ", error);
    notifications.show({
      color: "red",
      title: t("common.Error"),
      message: t("notifications.tasks.GetTasksError"),
      classNames: classes,
    });
    throw error;
  }
};
