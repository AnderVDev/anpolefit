import { Activities, BodyTypes, Expectations, Gender } from "@/types/calculator";
import { create } from "zustand";

interface StepState {
  step: number;
  previousStep: number;
  increase: () => void;
  decrease: () => void;
}

interface StepOneState {
  age: number;
  weight: number;
  height: number;
  gender: Gender | undefined;
  activity: Activities | undefined;
}

interface StepOneStore {
  formData: StepOneState;
  setFormData: (data: Partial<StepOneState>) => void;
  resetFormData: () => void;
}

interface StepTwoStore {
  expectations: Expectations | undefined;
  setExpectations: (newExpectation: Expectations) => void;
  clearExpectations: () => void;
}

interface StepThreeStore {
  bodyType: BodyTypes | undefined;
  setBodyType: (BodyType: BodyTypes) => void;
  clearBodyType: () => void;
}

export const useStepperCountStore = create<StepState>()((set) => ({
  step: 3,
  previousStep: 1, // Initialize the previousStep state
  increase: () =>
    set((state) => ({
      previousStep: state.step, // Update previousStep to the current step
      step: state.step + 1, // Increment the current step
    })),
  decrease: () =>
    set((state) => ({
      previousStep: state.step, // Update previousStep to the current step
      step: state.step - 1, // Decrement the current step
    })),
}));

export const useStepOneStore = create<StepOneStore>((set) => ({
  formData: {
    age: 0,
    weight: 0,
    height: 0,
    gender: undefined,
    activity: undefined,
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
        gender: undefined,
        activity: undefined,
      },
    })),
}));

export const useStepTwoStore = create<StepTwoStore>((set) => ({
  expectations: undefined,
  setExpectations: (newExpectation) => set({ expectations: newExpectation }),
  clearExpectations: () => set({ expectations: undefined }),
}));
export const useStepThreeStore = create<StepThreeStore>((set) => ({
  bodyType: undefined,
  setBodyType: (newBodyType) => set({ bodyType: newBodyType }),
  clearBodyType: () => set({ bodyType: undefined }),
}));
