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

interface StepTwoStore {
  expectations: string;
  setExpectations: (newExpectation: string) => void;
  clearExpectations: () => void;
}

interface StepThreeStore {
  BodyType: string;
  setExpectations: (newExpectation: string) => void;
  clearExpectations: () => void;
}

export const useStepperCountStore = create<StepState>()((set) => ({
  step: 2,
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

export const useStepTwoStore = create<StepTwoStore>((set) => ({
  expectations: "", 
  setExpectations: (newExpectation) => set({ expectations: newExpectation }), 
  clearExpectations: () => set({ expectations: "" }), 
}));
