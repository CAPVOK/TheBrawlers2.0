export interface ICluster {
  id: number;
  name: string;
  frequency: number;
}

export type GetClustersType = ICluster[] | null;