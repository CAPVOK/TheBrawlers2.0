import { AxiosResponse } from "axios";
import { clusterApi } from "./api";
import { GetClustersType } from "./types";

export const getClustersRequest = async (): Promise<
  AxiosResponse<GetClustersType>
> => {
  try {
    const response: AxiosResponse<GetClustersType> = await clusterApi.get(
      `/cluster/`
    );
    return response;
  } catch (error) {
    console.error("Ошибка получения данных:", error);
    throw error;
  }
};
