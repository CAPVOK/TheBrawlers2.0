import {
  createCaseToClusterRequest,
  getCasesByClusterRequest,
} from "./requests";
import { ICluster } from "../cluster/types";
import { ICreateCaseData } from "./types";

export const getCasesByCluster = async (cluster: ICluster["id"]) => {
  const response = await getCasesByClusterRequest(cluster);
  return response.data;
};

export const createCaseToCluster = async (data: ICreateCaseData) => {
  const response = await createCaseToClusterRequest(data);
  return response.data;
};
