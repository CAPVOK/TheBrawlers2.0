import { useClusters } from "../../store/clasterSlice";
import { getClustersRequest, updateClusterNameRequest } from "./requests";
import { IChangeClusterName } from "./types";

export const getClusters = async () => {
  const response = await getClustersRequest();
  const clusters = response.data;
  useClusters.getState().updateClusters(clusters || []);
  return clusters;
};

export const updateClusterName = async (data: IChangeClusterName) => {
  const response = await updateClusterNameRequest(data);
  return response.data;
};