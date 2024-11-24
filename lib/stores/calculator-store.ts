import { create } from "zustand";

interface StepState {
  step: number;
  increase: () => void;
  decrease: () => void;
}

export const useStepperCountStore = create<StepState>()((set) => ({
  step: 1,
  increase: () => set((state) => ({ step: state.step + 1 })),
  decrease: () => set((state) => ({ step: state.step - 1 })),
}));
