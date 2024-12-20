"use client";
import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import WelcomeCard from "./_components/welcome-card";
import Weekly from "./_components/weekly-calendar";
import Chat from "./_components/chat";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getNutritionProfileCurrentUser } from "@/actions/calculator-actions";
import PremiumFeatureUpgrade from "@/components/premiun-feature";
import NutritionalProfile from "./_components/nutritional-profile";
import NutritionalDataMsg from "@/app/(protected)/overview/_components/fill-nutrition-profile";

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
        className={`col-span-1 p-2 text-center rounded-md shadow-xl cursor-pointer ${
          isSelected
            ? "bg-green-800 text-primary-foreground"
            : "bg-white text-darkpurple"
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
// const POLLING_FREQUENCY_MS = 1000;
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
  const [isNutritionProfileAvailable, setIsNutritionProfileAvailable] =
    useState<boolean | undefined>(false);
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(
    null
  );

  const handleNutritionProfile = async () => {
    try {
      if (!currentUser?.id) return;
      const response = await getNutritionProfileCurrentUser(currentUser.id);
      console.log(response);
      setNutritionData(response?.data ?? null);
      setIsNutritionProfileAvailable(response?.success);
    } catch (error) {
      console.error("Failed to fetch nutrition profile:", error);
    }
  };

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
  useEffect(() => {
    setWeekLabel(getWeekLabel(currentWeek));
  }, [currentWeek]);

  useEffect(() => {
    handleNutritionProfile();
    // const timer = setInterval(handleNutritionProfile, POLLING_FREQUENCY_MS);

    // return () => clearInterval(timer);
  }, []);
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-2 bg-purpleLight-100 text-white">
      {/* Top Section */}
      <section className="w-full min-h-56 grid gap-4 px-4 md:grid-cols-2 lg:grid-cols-8 lg:gap-6">
        <div className="col-span-4 shadow-xl">
          <WelcomeCard />
        </div>
        <Card className="col-span-4 shadow-xl">
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
      <section className="w-full max-h-2/3  grid gap-4 px-4 md:grid-cols-2 lg:grid-cols-7 lg:gap-6 text-darkpurple">
        {isNutritionProfileAvailable ? (
          <NutritionalProfile
            formattedNutritionData={formattedNutritionData}
            totalNutrition={totalNutrition}
          />
        ) : (
          <NutritionalDataMsg />
        )}

        {/* <Card className="col-span-3 flex items-center justify-center bg-lightturquoise border-solid border-lightturquoise border shadow-x">
          {isCurrentUserAdmin ? <Chat /> : <PremiumFeatureUpgrade />}
        </Card> */}
        {isCurrentUserAdmin ? <Chat /> : <PremiumFeatureUpgrade />}
      </section>
    </div>
  );
}

export default Overview;
