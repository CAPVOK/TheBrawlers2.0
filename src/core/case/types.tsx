import { ICluster } from "../cluster/types";

export interface ICase {
  id: number;
  title: string;
  solution: string;
}

export interface ICreateCaseData {
  clusterId: ICluster["id"];
  title: string;
  solution: string;
}

export interface IChangeCaseData {
  caseId: ICase["id"];
  title: string;
  solution: string;
}

export type GetCasesByClusterRequestType = ICase[] | null;