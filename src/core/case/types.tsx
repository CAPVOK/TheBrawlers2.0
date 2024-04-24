export interface ICluster {
  id: number;
  name: string;
  frequency: number;
}

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

export type GetCasesByClusterRequestType = ICase[] | null;
