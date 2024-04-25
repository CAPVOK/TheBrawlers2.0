import { AxiosResponse } from "axios";
import { caseApi } from "./api";

import {
  GetCasesByClusterRequestType,
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
    console.error("Ошибка получения данных:", error);
    throw error;
  }
};


