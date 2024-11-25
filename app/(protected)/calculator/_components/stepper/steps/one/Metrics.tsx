import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const boxStyle =
  "flex w-42 h-20 border border-gray-100 rounded-lg p-2 gap-2 items-center";

interface MetricsProps {
  onWeightChange: (value: number ) => void;
  onHeightChange: (value: number ) => void;
}
function Metrics({ onWeightChange, onHeightChange }: MetricsProps) {
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric");

  const handleHeightChangeMetric = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      onHeightChange(value); // value in cm
    }
  };

  const handleWeightChangeMetric = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      onWeightChange(value); // value in kg
    }
  };

  const handleHeightChangeImperial = (
    e: React.ChangeEvent<HTMLInputElement>,
    unit: "ft" | "in"
  ) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      const heightInCm = unit === "ft" ? value * 30.48 : value * 2.54;
      onHeightChange(heightInCm); // convert to cm
    }
  };

  const handleWeightChangeImperial = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      const weightInKg = value * 0.453592;
      onWeightChange(weightInKg); // convert to kg
    }
  };

  return (
    <Tabs
      defaultValue="metric"
      onValueChange={(value) => setUnitSystem(value as "metric" | "imperial")}
      className="flex flex-col items-center w-full "
    >
      <TabsList>
        <TabsTrigger value="imperial">Imperial</TabsTrigger>
        <TabsTrigger value="metric">Metric</TabsTrigger>
      </TabsList>

      {/* metrics content */}
      <TabsContent value="metric">
        <div className="flex flex-col md:flex-row gap-2 items-center ">
          <div className={`${boxStyle}`}>
            <h2 className="font-bold">Height</h2>
            <Input
              className="w-16 h-6"
              type="number"
              placeholder="cm"
              aria-label="Height in centimeters"
              onChange={handleHeightChangeMetric}
            />
          </div>

          <div className={`${boxStyle}`}>
            <h2 className="font-bold">Weight</h2>
            <Input
              className="w-16 h-6"
              type="number"
              placeholder="kg"
              aria-label="Weight in kilograms"
              onChange={handleWeightChangeMetric}
              // onChange={(e) => onWeightChange(parseFloat(e.target.value))}
            />
          </div>
        </div>
      </TabsContent>

      {/* imperial content */}
      <TabsContent value="imperial">
        <div className="flex flex-col md:flex-row gap-2 items-center ">
          <div className={`${boxStyle}`}>
            <h2 className="font-bold">Height</h2>
            <div className="flex flex-col gap-2">
              <Input
                className="w-16 h-6"
                type="number"
                placeholder="ft"
                aria-label="Height in feet"
                onChange={(e) => handleHeightChangeImperial(e, "ft")}
   
              />
              <Input
                className="w-16 h-6"
                type="number"
                placeholder="inch"
                onChange={(e) => handleHeightChangeImperial(e, "in")}
   
              />
            </div>
          </div>

          <div className={`${boxStyle}`}>
            <h2 className="font-bold ">Weight</h2>
            <Input
              className="w-16 h-6"
              type="number"
              placeholder="lbs"
              onChange={handleWeightChangeImperial}
            />
          </div>
        </div>
      </TabsContent>

      
    </Tabs>
  );
}

export default Metrics;
