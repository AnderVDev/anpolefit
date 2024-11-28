import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface WeeklyProps {
  weekLabel: string;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  children?: React.ReactNode; // Weekly content (e.g., days or events)
}

const Weekly: React.FC<WeeklyProps> = ({
  weekLabel,
  onPreviousWeek,
  onNextWeek,
  children,
}) => {
  return (
    <div
      className={cn("h-full  min-h-56 flex flex-col justify-center  p-6 rounded-lg bg-purpleVariant-300 shadow-purpleVariant-100 text-darkpurple r")}
    >
      {/* Header with week navigation */}
      <div className="flex items-center justify-between mb-4 rounded-lg">
        <Button
          variant="ghost"
          onClick={onPreviousWeek}
          className="flex items-center text-white border"
          aria-label="Previous Week"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        <h2 className="text-lg font-semibold text-white">{weekLabel}</h2>
        <Button
          variant="ghost"
          onClick={onNextWeek}
          className="flex items-center  text-white border"
          aria-label="Next Week"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Weekly Content */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 md:gap-4">
        {children}
      </div>
    </div>
  );
};

export default Weekly;
