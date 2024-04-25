import { AxiosResponse } from "axios";
import { clusterApi } from "./api";
import { GetClustersType, IChangeClusterName } from "./types";
import { notifications } from "@mantine/notifications";
import { t } from "i18next";

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
    notifications.show({
      color: "red",
      title: t("common.Error"),
      message: t("common.ErrorRequest"),
    });
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
    notifications.show({
      color: "green",
      title: t("common.Success"),
      message: t("common.SuccessRequest"),
    });
    return response;
  } catch (error) {
    console.error("Ошибка изменения названия:", error);
    notifications.show({
      color: "red",
      title: t("common.Error"),
      message: t("common.ErrorRequest"),
    });
    throw error;
  }
};
