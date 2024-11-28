"use client";
import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import WelcomeCard from "./_components/welcome-card";
import Weekly from "./_components/weekly-calendar";
import Chat from "./_components/chat";
import { RadialChart } from "@/components/CaloriesChart";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getNutritionProfileCurrentUser } from "@/actions/calculator-actions";
import PremiumFeatureUpgrade from "@/components/premiun-feature";

// Helper functions
const getWeekLabel = (date: Date): string => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  const startLabel = startOfWeek.toLocaleDateString("en-US", options);
  const endLabel = endOfWeek.toLocaleDateString("en-US", {
    ...options,
    year: "numeric",
  });

  return `${startLabel} - ${endLabel}`;
};

const generateWeekDays = (
  date: Date,
  selectedDays: number[],
  toggleDay: (index: number) => void
) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());

  return Array.from({ length: 7 }).map((_, index) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + index);
    const isSelected = selectedDays.includes(index);

    return (
      <div
        key={index}
        onClick={() => toggleDay(index)}
        className={`col-span-1 p-2 text-center rounded-md shadow-md cursor-pointer ${
          isSelected
            ? "bg-green-800 text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        }`}
      >
        {day.toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
        })}
      </div>
    );
  });
};

interface NutritionData {
  proteinKcal: number;
  carbKcal: number;
  fatKcal: number;
  proteinGrams: number;
  carbGrams: number;
  fatGrams: number;
}

function Overview() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [weekLabel, setWeekLabel] = useState(getWeekLabel(currentWeek));
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const currentUser = useCurrentUser();
  const isCurrentUserAdmin = currentUser?.role === "ADMIN";
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(
    null
  );

  useEffect(() => {
    setWeekLabel(getWeekLabel(currentWeek));
  }, [currentWeek]);

  useEffect(() => {
    handleNutritionProfile();
  }, []);

  const toggleDay = (index: number) => {
    setSelectedDays((prev) =>
      prev.includes(index)
        ? prev.filter((day) => day !== index)
        : [...prev, index]
    );
  };

  const handlePreviousWeek = () => {
    setCurrentWeek((prev) => new Date(prev.setDate(prev.getDate() - 7)));
  };

  const handleNextWeek = () => {
    setCurrentWeek((prev) => new Date(prev.setDate(prev.getDate() + 7)));
  };

  const handleNutritionProfile = async () => {
    if (!currentUser?.id) return;

    try {
      const response = await getNutritionProfileCurrentUser(currentUser.id);
      setNutritionData(response.data);
    } catch (error) {
      console.error("Failed to fetch nutrition profile:", error);
    }
  };

  const totalNutrition = nutritionData
    ? nutritionData.proteinKcal + nutritionData.carbKcal + nutritionData.fatKcal
    : 0;

  const formattedNutritionData = nutritionData
    ? [
        {
          id: "PROTEIN",
          name: "Protein",
          resultKcal: nutritionData.proteinKcal,
          resultGrams: nutritionData.proteinGrams,
          total: totalNutrition,
          fill: 6,
        },
        {
          id: "CARBOHYDRATES",
          name: "Carbohydrates",
          resultKcal: nutritionData.carbKcal,
          resultGrams: nutritionData.carbGrams,
          total: totalNutrition,
          fill: 4,
        },
        {
          id: "FAT",
          name: "Fat",
          resultKcal: nutritionData.fatKcal,
          resultGrams: nutritionData.fatGrams,
          total: totalNutrition,
          fill: 3,
        },
      ]
    : [];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4">
      {/* Top Section */}
      <section className="w-full grid gap-4 px-4 md:grid-cols-2 lg:grid-cols-8 lg:gap-6">
        <div className="col-span-4">
          <WelcomeCard />
        </div>
        <Card className="col-span-4">
          <Weekly
            weekLabel={weekLabel}
            onPreviousWeek={handlePreviousWeek}
            onNextWeek={handleNextWeek}
          >
            {generateWeekDays(currentWeek, selectedDays, toggleDay)}
          </Weekly>
        </Card>
      </section>

      {/* Bottom Section */}
      <section className="w-full grid gap-4 px-4 md:grid-cols-2 lg:grid-cols-7 lg:gap-6">
        <Card className="col-span-4 flex flex-col items-center justify-center">
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
            <div className="text-center text-sm text-muted-foreground">
              <p>
                These results are based on the information you provided, so they
                are estimates. Track your progress and make changes as needed to
                reach your goals.
              </p>
            </div>
          </section>
        </Card>
        <Card className="col-span-3 flex items-center justify-center">
          {isCurrentUserAdmin ? <Chat /> : <PremiumFeatureUpgrade />}
        </Card>
      </section>
    </div>
  );
}

export default Overview;
