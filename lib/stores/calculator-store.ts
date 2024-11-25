import { create } from "zustand";

interface StepState {
  step: number;
  increase: () => void;
  decrease: () => void;
}

interface StepOneState {
  age: number;
  weight: number;
  height: number;
  gender: string;
  activity: string;
}

interface StepOneStore {
  formData: StepOneState;
  setFormData: (data: Partial<StepOneState>) => void;
  resetFormData: () => void;
}

export const useStepperCountStore = create<StepState>()((set) => ({
  step: 1,
  increase: () => set((state) => ({ step: state.step + 1 })),
  decrease: () => set((state) => ({ step: state.step - 1 })),
}));

export const useStepOneStore = create<StepOneStore>((set) => ({
  formData: {
    age: 0,
    weight: 0,
    height: 0,
    gender: "",
    activity: "",
  },
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  resetFormData: () =>
    set(() => ({
      formData: {
        age: 0,
        weight: 0,
        height: 0,
        gender: "",
        activity: "",
      },
    })),
}));