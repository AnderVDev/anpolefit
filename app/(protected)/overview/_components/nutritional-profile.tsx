import { RadialChart } from '@/components/CaloriesChart'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
interface NutritionalProfileProps {
    formattedNutritionData: {
      id: string;
      name: string;
      resultKcal: number;
      resultGrams: number;
      total: number;
      fill: number;
    }[];
    totalNutrition: number;
  }
  
function NutritionalProfile({formattedNutritionData, totalNutrition}: NutritionalProfileProps) {
  return (
    <Card className=" max-h-2/3 col-span-4 flex flex-col items-center justify-center bg-purpleVariant-200 shadow-xl ">
          <CardHeader className="flex items-center text-2xl">
            <CardTitle className="font-bold text-darkpurple text-3xl">
              Nutritional Profile
            </CardTitle>
            <CardDescription className="flex items-center justify-center text-center text-darkpurple">
              Start with the calories and macros below, and take the first step
              toward crushing your goal. Let&apos;s make it happen!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center">
            <RadialChart
              name="Total"
              valueKcal={totalNutrition}
              valueGrams={1}
              total={totalNutrition}
              chartData={[
                { name: "TDCI", value: 100, fill: "hsl(var(--chart-2))" },
              ]}
              chartConfig={{
                TDCI: { label: "Total", color: "hsl(var(--chart-2))" },
              }}
            />
            <section className="flex flex-col items-center gap-4 p-4">
              <div className="flex flex-wrap justify-center gap-4">
                {formattedNutritionData.map((intake) => (
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
                        fill: `hsl(var(--chart-${intake.fill}))`,
                      },
                    ]}
                    chartConfig={{
                      [intake.name]: {
                        label: intake.name,
                        color: `hsl(var(--chart-${intake.fill}))`,
                      },
                    }}
                  />
                ))}
              </div>
            </section>
          </CardContent>
          <CardFooter>
            <div className="text-center text-sm text-darkpurple">
              <p>
                These results are based on the information you provided, so they
                are estimates. Track your progress and make changes as needed to
                reach your goals.
              </p>
            </div>
          </CardFooter>
        </Card>
  )
}

export default NutritionalProfile