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
      message: t("common.ErrorRequest"),
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
      message: t("common.SuccessRequest"),
    });
    return response;
  } catch (error) {
    console.error("Ошибка отправки решения:", error);
    notifications.show({
      color: "red",
      title: t("common.Error"),
      message: t("common.ErrorRequest"),
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
      message: t("common.SuccessRequest"),
    });
  } catch (error) {
    console.error("Ошибка при удалении:", error);
    notifications.show({
      color: "red",
      title: t("common.Error"),
      message: t("common.ErrorRequest"),
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
      message: t("common.SuccessRequest"),
    });
    return response;
  } catch (error) {
    console.error("Ошибка изменения решения:", error);
    notifications.show({
      color: "red",
      title: t("common.Error"),
      message: t("common.ErrorRequest"),
    });
    throw error;
  }
};
