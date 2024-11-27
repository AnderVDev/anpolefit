"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Card } from "@/components/ui/card";

const chartData = [
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface RadialProgressProp {
  name: string;
  valueKcal: number;
  valueGrams: number;
  total: number;
}

export function RadialChart({
  name,
  valueKcal,
  valueGrams,
  total,
}: RadialProgressProp) {
  const intake = (valueKcal / total) * 100;
  // Ensure value is between 0 and 100
  const progressValue = Math.min(Math.max(intake, 0), 100);

  return (
    <Card className="flex flex-col items-center justify-center">
        <h4>{name}</h4>
      <ChartContainer config={chartConfig} className="w-auto h-40  ">
        <RadialBarChart
          data={chartData}
          startAngle={0}
          endAngle={250}
          innerRadius={40}
          outerRadius={55}
          className="w-26"
        >
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="first:fill-muted last:fill-background"
            polarRadius={[44, 38]}
          />
          <RadialBar dataKey="visitors" background cornerRadius={10} />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-2xl font-bold"
                      >
                        {valueKcal}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        {name !== "total" && valueGrams.toLocaleString()}g
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
    </Card>
  );
}
