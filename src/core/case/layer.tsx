import {
  createCaseToClusterRequest,
  getCasesByClusterRequest,
} from "./requests";
import { ICluster, ICreateCaseData } from "./types";

export const getCasesByCluster = async (cluster: ICluster["id"]) => {
  const response = await getCasesByClusterRequest(cluster);
  const cases = response.data;
  return cases;
};

export const createCaseToCluster = async (data: ICreateCaseData) => {
  const response = await createCaseToClusterRequest(data);
  return response.data;
};
