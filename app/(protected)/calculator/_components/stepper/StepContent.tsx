import { useStepperCountStore } from "@/lib/stores/calculator-store";
import StepOne from "./steps/one";
import StepTwo from "./steps/two";

// interface StepContentProps {}
function StepContent() {
  const currentStep = useStepperCountStore((state) => state.step);
//   const increment = useStepperCountStore((state) => state.increase);
  // const decrement = useStepperCountStore((state) => state.decrease);
  return (
    <>
      <div className="flex items-center ">
        {currentStep === 1 && <StepOne />}
        {currentStep === 2 && <StepTwo />}

      </div>
    </>
  );
}

export default StepContent;
