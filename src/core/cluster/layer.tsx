import { useClusters } from "../../store/clasterSlice";
import { getClustersRequest } from "./requests";

export const getClusters = async () => {
  const response = await getClustersRequest();
  const clusters = response.data;
  useClusters.getState().updateClusters(clusters || []);
  return clusters;
};