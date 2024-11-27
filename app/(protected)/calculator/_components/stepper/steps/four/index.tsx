import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useCallback, useEffect, useState } from "react";
// import CaloricIntakeCard from "./CaloricIntakeCard";
import { Button } from "@/components/ui/button";
// import toast from "react-hot-toast";
// import axios from "axios";
import {
  useStepOneStore,
  useStepperCountStore,
  useStepThreeStore,
  useStepTwoStore,
} from "@/lib/stores/calculator-store";
import {
  BODY_TYPES_CONSTANTS_PERCENTAGES,
  calculateBMR,
  calculateTDEE,
  KCAL_TO_GRAMS_CONSTANTS,
  TDCI_CONSTANT,
  WEEKLY_FAT_LOSS_RATE,
} from "@/lib/calculator";
import { RadialChart } from "./CaloriesIntakeChart";
interface CaloricIntake {
  id: string;
  name: string;
  resultKcal: number;
  resultGrams: number;
  total: number;
}
const initialCaloricIntakes: CaloricIntake[] = [
  { id: "PROTEIN", name: "Protein", resultKcal: 0, resultGrams: 0, total: 0 },
  {
    id: "CARBOHYDRATES",
    name: "Carbohydrates",
    resultKcal: 0,
    resultGrams: 0,
    total: 0,
  },
  { id: "FAT", name: "Fat", resultKcal: 0, resultGrams: 0, total: 0 },
];
const POLLING_FREQUENCY_MS = 1000;

function StepFour() {
  const decrement = useStepperCountStore((state) => state.decrease);
  const [bmr, setBMR] = useState<number | null>(null);
  const [tdee, setTDEE] = useState<number | null>(null);
  const [results, setResults] = useState<CaloricIntake[]>(
    initialCaloricIntakes
  );
  // const [userThread] = useAtom(userThreadAtom);
  const [tdci, setTDCI] = useState<number>(0);
  const [proteinKcal, setProteinKcal] = useState<number>(0);
  const [proteinGrams, setProteinGrams] = useState<number>(0);
  const [carbKcal, setCarbKcal] = useState<number>(0);
  const [carbGrams, setCarbGrams] = useState<number>(0);
  const [fatKcal, setFatKcal] = useState<number>(0);
  const [fatGrams, setFatGrams] = useState<number>(0);
  // const { bodyType, weight, gender, activity, height, age, expectation } =
  //   inputs;

  // Step Stores values
  const stepOneData = useStepOneStore((state) => state.formData);
  const stepTwoData = useStepTwoStore((state) => state.expectations);
  const stepThreeData = useStepThreeStore((state) => state.bodyType);
  const { gender, weight, height, age, activity } = stepOneData;

  const handleTDCIChange = useCallback(async () => {
    if (gender && weight && height && age) {
      const bmrValue = calculateBMR(gender, weight, height, age);
      setBMR(bmrValue);
    }

    if (bmr && activity) {
      const tdeeValue = calculateTDEE(bmr, activity);
      setTDEE(tdeeValue);
    }

    // Target daily calorie intake (TDCI)

    if (tdee && weight && stepThreeData) {
      const TDCIFormula =
        tdee - weight * WEEKLY_FAT_LOSS_RATE * TDCI_CONSTANT["KILOGRAMS"];

      setTDCI(Math.round(TDCIFormula));
      const percentages = BODY_TYPES_CONSTANTS_PERCENTAGES[stepThreeData];

      setProteinKcal(Math.round((tdci * percentages.PROTEIN) / 100));
      setProteinGrams(
        Math.round(proteinKcal / KCAL_TO_GRAMS_CONSTANTS.PROTEIN)
      );

      setCarbKcal(Math.round((tdci * percentages.CARBOHYDRATE) / 100));
      setCarbGrams(Math.round(carbKcal / KCAL_TO_GRAMS_CONSTANTS.CARBOHYDRATE));

      setFatKcal(Math.round((tdci * percentages.FAT) / 100));
      setFatGrams(Math.round(fatKcal / KCAL_TO_GRAMS_CONSTANTS.FAT));
    }
  }, [
    activity,
    age,
    bmr,
    carbKcal,
    fatKcal,
    gender,
    height,
    proteinKcal,
    stepThreeData,
    tdci,
    tdee,
    weight,
  ]);

  const HandleDataSave = async () => {
    console.log({
      "Data saved": stepOneData,
      Expectation: stepTwoData,
      "Body Type": stepThreeData,
    });
  };
  useEffect(() => {
    handleTDCIChange();
    const timer = setInterval(handleTDCIChange, POLLING_FREQUENCY_MS);

    setResults([
      {
        id: "PROTEIN",
        name: "Protein",
        resultKcal: proteinKcal,
        resultGrams: proteinGrams,
        total: tdci,
      },
      {
        id: "CARBOHYDRATES",
        name: "Carbohydrates",
        resultKcal: carbKcal,
        resultGrams: carbGrams,
        total: tdci,
      },
      {
        id: "FAT",
        name: "Fat",
        resultKcal: fatKcal,
        resultGrams: fatGrams,
        total: tdci,
      },
    ]);
    return () => clearInterval(timer);
  }, [
    tdci,
    proteinKcal,
    carbKcal,
    fatKcal,
    proteinGrams,
    carbGrams,
    fatGrams,
    handleTDCIChange,
  ]);

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="flex flex-col p-4 border border-gray-100 rounded-lg cursor-pointer items-center gap-2 w-96 h-72">
        <CardTitle>Caloric Intakes</CardTitle>
        <CardContent className="flex flex-col justify-center items-center">
          <RadialChart name={"MacroTest"} valueKcal={50} valueGrams={100} total={100} />
          {/* <div className="flex items-center ">
            {results.map((intake) => (
              <CaloricIntakeCard
                key={intake.id}
                name={intake.name}
                resultKcal={intake.resultKcal}
                resultGrams={intake.resultGrams}
                total={intake.total}
              />
            ))}
          </div> */}
          {/* <CardDescription>
              Remember, this estimate is based on your weight, height, age,
              gender, and usual activity level. Use this information to help you
              determine how many calories you should consume to maintain your
              current weight. On days when you're more active, you’ll need more
              calories, so don’t hesitate to eat a bit more. On days when you're
              less active, consider reducing your calorie intake. If your goal
              is to lose weight, aim to eat fewer calories than you burn or
              increase your activity level. However, always prioritize
              nutritious meals and avoid cutting calories too drastically.
              Eating too little or losing weight too quickly can be harmful and
              unsafe. Keep it balanced and healthy!
            </CardDescription> */}
        </CardContent>
      </Card>
      <section className="flex gap-2">
        <Button
          className="bg-purple-400 hover:bg-gray-500 rounded-lg m-0 "
          type="button"
          onClick={decrement}
        >
          Back
        </Button>
        <Button className="bg-gray-500 rounded-lg" onClick={HandleDataSave}>
          Save
        </Button>
        <Button className="bg-gray-500 rounded-lg ">Next</Button>
      </section>
    </div>
  );
}
export default StepFour;
