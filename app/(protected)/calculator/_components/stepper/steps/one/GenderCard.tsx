import React from "react";

import { Gender } from "@/types/calculator";
const selectedStyle = "ring-2 ring-gray-500 bg-purpleVariant-700 ";
const unselectedStyle = "hover:bg-gray-100";

interface GenderCardProps {
  gender: Gender;
  selected: boolean;
  onSelect: () => void;
}
function GenderCard({ gender, selected, onSelect }: GenderCardProps) {
  return (
    <div
      className={`flex p-2 gap-2 w-24 h-8 items-center justify-center border border-purpleVariant-700 rounded-lg shadow-current cursor-pointer ring-purpleVariant-700 hover:bg-purpleVariant-700 ${
        selected ? selectedStyle : unselectedStyle
      }
       ${selected ? `bg-purpleVariant-700` : ""}`}
      onClick={onSelect}
    >
      <p
        className={`text-sm  hover:text-white  ${
          selected ? "font-bold text-white" : "text-purpleVariant-700"
        }`}
      >
        {gender}
      </p>
    </div>
  );
}

export default GenderCard;
