import { AxiosResponse } from "axios";
import { clusterApi } from "./api";
import { GetClustersType, IChangeClusterName } from "./types";

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

export const updateClusterNameRequest = async (
  data: IChangeClusterName
): Promise<AxiosResponse<unknown>> => {
  try {
    const response: AxiosResponse<unknown> = await clusterApi.put(
      `/cluster/${data.id}`,
      {
        name: data.name,
      }
    );
    return response;
  } catch (error) {
    console.error("Ошибка изменения названия:", error);
    throw error;
  }
};
