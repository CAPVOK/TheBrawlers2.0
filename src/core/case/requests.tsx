import { AxiosResponse } from "axios";
import { caseApi } from "./api";

import {
  GetCasesByClusterRequestType,
  IChangeCaseData,
  ICreateCaseData,
} from "./types";
import { ICluster } from "../cluster/types";

export const getCasesByClusterRequest = async (
  clusterId: ICluster["id"]
): Promise<AxiosResponse<GetCasesByClusterRequestType>> => {
  try {
    const response: AxiosResponse<GetCasesByClusterRequestType> =
      await caseApi.get(`/cluster/${clusterId}`);
    return response;
  } catch (error) {
    console.error("Ошибка получения данных:", error);
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
    return response;
  } catch (error) {
    console.error("Ошибка отправки решения:", error);
    throw error;
  }
};

export const deleteCaseRequest = async (caseId: number): Promise<void> => {
  try {
    await caseApi.delete(`/cases/${caseId}`);
  } catch (error) {
    console.error("Ошибка при удалении:", error);
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
    return response;
  } catch (error) {
    console.error("Ошибка изменения решения:", error);
    throw error;
  }
};
