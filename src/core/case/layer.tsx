import {
  createCaseToClusterRequest,
  deleteCaseRequest,
  getCasesByClusterRequest,
  updateCaseRequest,
} from "./requests";
import { ICluster } from "../cluster/types";
import { IChangeCaseData, ICreateCaseData } from "./types";

export const getCasesByCluster = async (cluster: ICluster["id"]) => {
  const response = await getCasesByClusterRequest(cluster);
  return response.data;
};

export const createCaseToCluster = async (data: ICreateCaseData) => {
  const response = await createCaseToClusterRequest(data);
  return response.data;
};

export const updateCase = async (data: IChangeCaseData) => {
  const response = await updateCaseRequest(data);
  return response.data;
};

export const deleteCase = async (caseId: number) => {
  await deleteCaseRequest(caseId);
};
