"use client";
import { motion } from "framer-motion";
import { useStepperCountStore } from "@/lib/stores/calculator-store";
import StepOne from "./steps/one";
import StepTwo from "./steps/two";
import StepThree from "./steps/three";
import StepFour from "./steps/four";
// interface StepContentProps {}
function StepContent() {
  const currentStep = useStepperCountStore((state) => state.step);
  const previousStep =  useStepperCountStore((state) => state.previousStep);
  const delta = currentStep - previousStep;
  //   const increment = useStepperCountStore((state) => state.increase);
  // const decrement = useStepperCountStore((state) => state.decrease);
  return (
    <>
      <div className="flex items-center ">
        {currentStep === 1 && (
          <motion.div
            initial={{ x: "50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <StepOne />
          </motion.div>
        )}
        {currentStep === 2 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <StepTwo />
          </motion.div>
        )}
        {currentStep === 3 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <StepThree />
          </motion.div>
        )}
        {currentStep === 4 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <StepFour />
          </motion.div>
        )}
      </div>
    </>
  );
}

export default StepContent;
