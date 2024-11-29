"use client";

import React from "react";
import Stepper from "./_components/stepper";


function Calculator() {

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-2 bg-purpleLight-100">
      <Stepper />
    </div>
  );
}

export default Calculator;
