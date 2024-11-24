import { Card } from "@/components/ui/card";
import React from "react";
import { RadialChart } from "./radial-chart";


const sampleData = [
  { browser: "Safari", visitors: 200, fill: "var(--color-safari)" },
];

const sampleConfig = {
  visitors: { label: "Visitors" },
  Safari: { label: "Safari", color: "hsl(var(--chart-2))" },
};

function CaloriesChart() {
  return (
    <Card className="w-full h-full flex items-center justify-center">
      <RadialChart
      data={sampleData}
      dataKey="visitors"
      chartConfig={sampleConfig}
      title="200"
      subtitle="Visitors"
      className="max-w-md mx-auto"
    />

    </Card>
  );
}

export default CaloriesChart;
