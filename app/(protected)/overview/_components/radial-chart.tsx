"use client"

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"


interface RadialChartProps {
  data: Array<{
    [key: string]: unknown; // Allows flexible data structure
    fill?: string; // Color for individual bars
  }>;
  dataKey: string; // Key used for RadialBar's data
  chartConfig: ChartConfig; // Configuration for labels and colors
  startAngle?: number; // Optional customization for start angle
  endAngle?: number; // Optional customization for end angle
  innerRadius?: number; // Inner radius for the chart
  outerRadius?: number; // Outer radius for the chart
  title?: string; // Optional title displayed in the center
  subtitle?: string; // Optional subtitle displayed in the center
  className?: string; // Additional className for styling
}



export function RadialChart({
  data,
  dataKey,
  chartConfig,
  startAngle = 0,
  endAngle = 200,
  innerRadius = 40,
  outerRadius = 55,
  title,
  subtitle,
  className,
}: RadialChartProps) {
  const centerLabel = data.length > 0 ? data[0][dataKey]?.toLocaleString() : "";
  return (
    <>
     <Card className={`flex flex-col ${className} max-w-[300px]`}>
      <CardContent className="flex-1 pb-2">
        <ChartContainer
          config={chartConfig}
          className="mx-auto max-h-[250px] max-w-[180px]"
        >
          <RadialBarChart
            data={data}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[44, 38]}
            />
            <RadialBar dataKey={dataKey} background cornerRadius={10} />
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
                        {title && (
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-2xl font-bold"
                          >
                            {centerLabel || title}
                          </tspan>
                        )}
                        {subtitle && (
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            {subtitle}
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
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>

   
    </>
    
  )
}
