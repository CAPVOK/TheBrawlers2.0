import { AxiosResponse } from "axios";
import { IUser } from "./types";
import { userApi } from "./api";
import { notifications } from "@mantine/notifications";
import { t } from "i18next";
import classes from "../notifications.module.css";

export const getUsersRequest = async (): Promise<AxiosResponse<IUser>> => {
  try {
    const response: AxiosResponse<IUser> = await userApi.get(`/users/`);
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
  userData: IUser
): Promise<AxiosResponse<IUser>> => {
  try {
    const response: AxiosResponse<IUser> = await userApi.get(
      `/users/${userData.userId}/`
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
