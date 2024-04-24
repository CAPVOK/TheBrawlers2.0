import { create } from "zustand";

export interface ICluster {
  id: number;
  title: string;
  solved: boolean;
  frequency: number;
  caseId?: number;
}

export type ClusterState = {
  activeCluster: ICluster["id"];
  clusters: ICluster[];
};

export type ClusterActions = {
  changeActiveCluster: (clusterId: number) => void;
  closeCluster: () => void;
  updateClusters: (clusters: ICluster[]) => void;
};

const initialState: ClusterState = {
  activeCluster: -1,
  clusters: [],
};

export const useClusters = create<ClusterActions & ClusterState>((set) => ({
  ...initialState,
  changeActiveCluster: (cluster) => set({ activeCluster: cluster }),
  closeCluster: () => set({ activeCluster: -1 }),
  updateClusters: (clusters) => set({ clusters }),
}));
