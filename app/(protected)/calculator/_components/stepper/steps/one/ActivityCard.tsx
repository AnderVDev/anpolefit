import React from "react";

const selectedStyle = "ring-purpleVariant-700 bg-purpleVariant-700";
const unselectedStyle = "";

interface ActivityCardProps {
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}

function ActivityCard({
  title,
  description,
  selected,
  onSelect,
}: ActivityCardProps) {
  return (
    <div
      className={`flex flex-col p-4 items-center justify-center border border-purpleLight-100 shadow-current  rounded-lg  cursor-pointer  w-52  hover:bg-purpleVariant-100 ${
        selected ? selectedStyle : unselectedStyle
      } ${selected ? `bg-purpleVariant-700` : ""}`}
      onClick={onSelect}
    >
      <h2
        className={`font-bold text-sm mb-1   ${
          selected ? " text-white" : "text-purpleVariant-700"
        } `}
      >
        {title}
      </h2>
      <p
        className={`text-xs text-center  ${
          selected ? " text-white" : "text-purpleVariant-700"
        }`}
      >
        {description}
      </p>
    </div>
  );
}

export default ActivityCard;
