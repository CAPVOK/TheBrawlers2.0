import { create } from "zustand";
import { ICluster } from "../core/cluster/types";

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
