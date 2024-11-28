"use client";
import React, { useState } from "react";
import { Check } from "lucide-react";
import { useStepperCountStore } from "@/lib/stores/calculator-store";
import StepContent from "./StepContent";
import { motion } from "framer-motion";
// import StepContent from "./StepContent";
// import { Button } from "../ui/button";

const Stepper = () => {
  const steps = ["About You", "Expectations", "Body Type", "Results"];
  const currentStep = useStepperCountStore((state) => state.step);

  const [complete] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="flex justify-between mb-4"
        initial={{ x: "50%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {steps.map((step, i) => (
          <div
            key={i}
            className={`relative flex flex-col justify-center items-center w-36 ${
              currentStep === i + 1 ? "active" : ""
            } ${i + 1 < currentStep || complete ? "complete" : ""}`}
          >
            {i !== 0 && (
              <div
                className={`absolute w-full h-[3px] right-2/4 top-1/3 -translate-y-2/4 ${
                  i + 1 < currentStep || complete
                    ? "bg-primary-500"
                    : "bg-gray-100"
                }`}
              />
            )}
            <div
              className={`w-10 h-10 flex items-center justify-center z-10 relative rounded-full font-semibold text-gray-20  ${
                i + 1 < currentStep || complete
                  ? "bg-primary-500"
                  : currentStep === i + 1
                  ? "bg-gray-500"
                  : "bg-gray-100"
              }`}
            >
              {i + 1 < currentStep || complete ? <Check size={24} /> : i + 1}
            </div>
            <p>{step}</p>
          </div>
        ))}
      </motion.div>
      <StepContent />
    </div>
  );
};

export default Stepper;
