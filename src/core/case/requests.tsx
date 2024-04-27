import { AxiosResponse } from "axios";
import { caseApi } from "./api";

import {
  GetCasesByClusterRequestType,
  IChangeCaseData,
  ICreateCaseData,
} from "./types";
import { ICluster } from "../cluster/types";
import { notifications } from "@mantine/notifications";
import { t } from "i18next";
import classes from "../notifications.module.css";

export const getCasesByClusterRequest = async (
  clusterId: ICluster["id"]
): Promise<AxiosResponse<GetCasesByClusterRequestType>> => {
  try {
    const response: AxiosResponse<GetCasesByClusterRequestType> =
      await caseApi.get(`/cluster/${clusterId}`);
    return response;
  } catch (error) {
    console.error("Ошибка получения данных:", error);
    notifications.show({
      color: "red",
      title: t("common.Error"),
      message: t("notifications.cases.GetCasesError"),
      classNames: classes,
    });
    throw error;
  }
};

export const createCaseToClusterRequest = async (
  data: ICreateCaseData
): Promise<AxiosResponse<unknown>> => {
  try {
    const response: AxiosResponse<unknown> = await caseApi.post(
      `/cluster/${data.clusterId}`,
      {
        title: data.title,
        solution: data.solution,
      }
    );
    notifications.show({
      color: "green",
      title: t("common.Success"),
      message: t("notifications.cases.CreateCasesSuccessful"),
      classNames: classes,
    });
    return response;
  } catch (error) {
    console.error("Ошибка отправки решения:", error);
    notifications.show({
      color: "red",
      title: t("common.Error"),
      message: t("notifications.cases.CreateCasesError"),
      classNames: classes,
    });
    throw error;
  }
};

export const deleteCaseRequest = async (caseId: number): Promise<void> => {
  try {
    await caseApi.delete(`/cases/${caseId}`);
    notifications.show({
      color: "green",
      title: t("common.Success"),
      message: t("notifications.cases.DeleteCasesSuccessful"),
      classNames: classes,
    });
  } catch (error) {
    console.error("Ошибка при удалении:", error);
    notifications.show({
      color: "red",
      title: t("common.Error"),
      message: t("notifications.cases.DeleteCasesError"),
      classNames: classes,
    });
    throw error;
  }
};

export const updateCaseRequest = async (
  data: IChangeCaseData
): Promise<AxiosResponse<unknown>> => {
  try {
    const response: AxiosResponse<unknown> = await caseApi.put(
      `/cases/${data.caseId}`,
      {
        title: data.title,
        solution: data.solution,
      }
    );
    notifications.show({
      color: "green",
      title: t("common.Success"),
      message: t("notifications.cases.UpdateCasesSuccessful"),
      classNames: classes,
    });
    return response;
  } catch (error) {
    console.error("Ошибка изменения решения:", error);
    notifications.show({
      color: "red",
      title: t("common.Error"),
      message: t("notifications.cases.UpdateCasesError"),
      classNames: classes,
    });
    throw error;
  }
};
