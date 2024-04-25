export interface ICluster {
  id: number;
  name: string;
  frequency: number;
}

export interface IChangeClusterName{
  id: ICluster["id"];
  name: string;
}

export type GetClustersType = ICluster[] | null;