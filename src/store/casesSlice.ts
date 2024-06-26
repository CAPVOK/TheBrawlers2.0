import { create } from "zustand";
import { ICase } from "../core/case/types";

export type CasesState = {
  activeCase: ICase["id"];
  cases: ICase[]; // not used todo
};

export type CasesActions = {
  changeActiveCase: (caseId: number) => void;
  closeCase: () => void;
  updateCases: (tasks: ICase[]) => void; // not used
  clearCases: () => void; // not used
};

const initialState: CasesState = {
  activeCase: -1,
  cases: [],
};

export const useCases = create<CasesActions & CasesState>((set) => ({
  ...initialState,
  changeActiveCase: (caseId) => set({ activeCase: caseId }),
  closeCase: () => set({ activeCase: -1 }),
  updateCases: (cases) => set({ cases }),
  clearCases: () => set({ cases: [] }),
}));
