"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

interface RadialProgressProp {
  name: string;
  valueKcal: number;
  valueGrams: number;
  total: number;
  chartData?: { name: string; value: number; fill: string }[]; // Customizable chart data
  chartConfig?: ChartConfig; // Customizable chart config
}

export function RadialChart({
  name = "Empty",
  valueKcal = 0,
  valueGrams = 0,
  total = 0,
  chartData,
  chartConfig,
}: RadialProgressProp) {
  const intake = (valueKcal / total) * 100;
  // Ensure value is between 0 and 100
  const progressValue = Math.min(Math.max(intake, 0), 100); // Clamp value between 0 and 100

  const defaultChartData = [
    { name: name, value: progressValue, fill: "hsl(var(--chart-primary))" },
  ];

  // Default chart config if not provided
  const defaultChartConfig: ChartConfig = {
    [name]: {
      label: name,
      color: "hsl(var(--chart-primary))",
    },
  };

  const chartContent = chartData || defaultChartData;
  const config = chartConfig || defaultChartConfig;
  return (
    <section className="flex flex-col items-center justify-center w-28 h-40 p-0 m-0">
      <h4 className="font-bold">{name}</h4>
      <ChartContainer config={config} className="w-28 h-24  ">
        <RadialBarChart
          data={chartContent}
          startAngle={90}
          endAngle={450}
          innerRadius={30}
          outerRadius={45}
        >
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="first:fill-muted last:fill-background"
            polarRadius={[34, 28]}
          />
          <RadialBar dataKey="value" background cornerRadius={10} />
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
                        className="fill-foreground text-xl font-bold"
                      >
                        {valueKcal}
                      </tspan>
                      {name !== "Total" && (
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 16}
                          className="fill-muted-foreground"
                        >
                          {valueGrams.toLocaleString()}g
                        </tspan>
                      )}
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
    </section>
  );
}
