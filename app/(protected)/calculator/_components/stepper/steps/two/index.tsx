import { useStepOneStore } from "@/lib/stores/calculator-store";
import React from "react";

function StepTwo() {
  const stepOneData = useStepOneStore((state) => state.formData);
  return (
    <>
      <div>StepTwo</div>
      <button onClick={() => console.log(stepOneData)}>one up</button>
    </>
  );
}

export default StepTwo;
