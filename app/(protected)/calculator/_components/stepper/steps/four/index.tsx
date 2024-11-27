import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useCallback, useEffect, useState, useTransition } from "react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
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
} from "@/lib/calculator/calculator";
import { RadialChart } from "./CaloriesIntakeChart";
import { useCurrentUser } from "@/hooks/use-current-user";
import { addMacrosAction } from "@/actions/calculator-actions";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
interface CaloricIntake {
  id: string;
  name: string;
  resultKcal: number;
  resultGrams: number;
  total: number;
  fill: number;
}
const initialCaloricIntakes: CaloricIntake[] = [
  {
    id: "PROTEIN",
    name: "Protein",
    resultKcal: 0,
    resultGrams: 0,
    total: 0,
    fill: 6,
  },
  {
    id: "CARBOHYDRATES",
    name: "Carbohydrates",
    resultKcal: 0,
    resultGrams: 0,
    total: 0,
    fill: 4,
  },
  { id: "FAT", name: "Fat", resultKcal: 0, resultGrams: 0, total: 0, fill: 3 },
];
const POLLING_FREQUENCY_MS = 1000;

function StepFour() {
  const decrement = useStepperCountStore((state) => state.decrease);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [bmr, setBMR] = useState<number | null>(null);
  const [tdee, setTDEE] = useState<number | null>(null);
  const [tdci, setTDCI] = useState<number>(0);
  const [results, setResults] = useState<CaloricIntake[]>(
    initialCaloricIntakes
  );

  const currentUser = useCurrentUser();

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

      const calculatedTDCI = Math.round(TDCIFormula);
      setTDCI(calculatedTDCI);

      const percentages = BODY_TYPES_CONSTANTS_PERCENTAGES[stepThreeData];
      const updatedResults = [
        {
          id: "PROTEIN",
          name: "Protein",
          resultKcal: Math.round((calculatedTDCI * percentages.PROTEIN) / 100),
          resultGrams: Math.round(
            (calculatedTDCI * percentages.PROTEIN) /
              100 /
              KCAL_TO_GRAMS_CONSTANTS.PROTEIN
          ),
          total: calculatedTDCI,
          fill: 6,
        },
        {
          id: "CARBOHYDRATES",
          name: "Carbohydrates",
          resultKcal: Math.round(
            (calculatedTDCI * percentages.CARBOHYDRATE) / 100
          ),
          resultGrams: Math.round(
            (calculatedTDCI * percentages.CARBOHYDRATE) /
              100 /
              KCAL_TO_GRAMS_CONSTANTS.CARBOHYDRATE
          ),
          total: calculatedTDCI,
          fill: 4,
        },
        {
          id: "FAT",
          name: "Fat",
          resultKcal: Math.round((calculatedTDCI * percentages.FAT) / 100),
          resultGrams: Math.round(
            (calculatedTDCI * percentages.FAT) /
              100 /
              KCAL_TO_GRAMS_CONSTANTS.FAT
          ),
          total: calculatedTDCI,
          fill: 3,
        },
      ];
      setResults(updatedResults);
    }
  }, [activity, age, bmr, gender, height, stepThreeData, tdee, weight]);

  const HandleDataSave = async () => {
    if (!currentUser?.id) {
      return null;
    }
    try {
      const nutritionData = {
        userId: currentUser.id,
        proteinKcal: results.find((r) => r.id === "PROTEIN")?.resultKcal ?? 0,
        proteinGrams: results.find((r) => r.id === "PROTEIN")?.resultGrams ?? 0,
        carbKcal:
          results.find((r) => r.id === "CARBOHYDRATES")?.resultKcal ?? 0,
        carbGrams:
          results.find((r) => r.id === "CARBOHYDRATES")?.resultGrams ?? 0,
        fatKcal: results.find((r) => r.id === "FAT")?.resultKcal ?? 0,
        fatGrams: results.find((r) => r.id === "FAT")?.resultGrams ?? 0,
      };
      console.log({ nutritionData });

      startTransition(async () => {
        const response = await addMacrosAction(nutritionData);
        console.log(response);
        if (response?.error) {
          setError(response.error);
        } else {
          setError(null);
          toast({
            description: "Your data has been saved successfully!",
          });
        }
      });

      // console.log({
      //   "Data saved": stepOneData,
      //   Expectation: stepTwoData,
      //   "Body Type": stepThreeData,
      //   TDCI: tdci,
      //   Results: results,
      //   user: currentUser.id,
      // });
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        setError(
          validationError.errors
            .map((err) => `${err.path.join(".")}: ${err.message}`)
            .join(", ")
        );
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    handleTDCIChange();
    const timer = setInterval(handleTDCIChange, POLLING_FREQUENCY_MS);

    return () => clearInterval(timer);
  }, [handleTDCIChange]);

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="flex flex-col p-4 border border-gray-100 rounded-lg cursor-pointer items-center gap-2 w-96 h-96">
        <CardTitle>Caloric Intakes</CardTitle>
        <CardContent className="flex flex-col justify-center items-center">
          <RadialChart
            name="Total"
            valueKcal={tdci}
            valueGrams={1}
            total={tdci}
            chartData={[
              { name: "TDCI", value: 100, fill: "hsl(var(--chart-2))" },
            ]}
            chartConfig={{
              TDCI: { label: "Total", color: "hsl(var(--chart-2))" },
            }}
          />
          <div className="flex items-center gap-2">
            {results.map((intake) => (
              <RadialChart
                key={intake.id}
                name={intake.name}
                valueKcal={intake.resultKcal}
                valueGrams={intake.resultGrams}
                total={intake.total}
                chartData={[
                  {
                    name: intake.name,
                    value: (intake.resultKcal / intake.total) * 100,
                    fill: `hsl(var(--chart-${intake.fill.toLocaleString()}))`,
                  },
                ]}
                chartConfig={{
                  [intake.name]: {
                    label: intake.name,
                    color: `hsl(var(--chart-${intake.fill.toLocaleString()}))`,
                  },
                }}
              />
            ))}
          </div>
          {/* <CardDescription>
            <small>
              {" "}
              Remember, this estimate is based on your weight, height, age,
              gender, and usual activity level. Use this information to help you
              determine how many calories you should consume to maintain your
              current weight. On days when you&apos;re more active, you&apos;ll need more
              calories, so don&apos;t hesitate to eat a bit more. On days when
              you&apos;re less active, consider reducing your calorie intake. If
              your goal is to lose weight, aim to eat fewer calories than you
              burn or increase your activity level. However, always prioritize
              nutritious meals and avoid cutting calories too drastically.
              Eating too little or losing weight too quickly can be harmful and
              unsafe. Keep it balanced and healthy!
            </small>
          </CardDescription> */}
        </CardContent>
      </Card>
      <section className="flex gap-2 mt-2">
        <Button className=" rounded-lg m-0 " type="button" onClick={decrement}>
          Back
        </Button>
        <Button
          className=" rounded-lg"
          onClick={HandleDataSave}
          disabled={isPending}
        >
          {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </Button>
        <Button className=" rounded-lg ">Next</Button>
      </section>
    </div>
  );
}
export default StepFour;
