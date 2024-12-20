import Image, { StaticImageData } from "next/image";
import defaultBody from "@/public/assets/foto1.png";

type OptionsCardProps = {
  name: string;
  description?: string;
  image: StaticImageData | string;
  selected: boolean;
  onSelect: () => void;
};

const selectedStyle = "opacity-90";
const unselectedStyle = "opacity-0";

const OptionsCard = ({
  name,
  description = "Some Default description",
  image = defaultBody,
  selected,
  onSelect,
}: OptionsCardProps) => {
  const overlayStyles = `absolute z-30 inset-0 flex flex-col items-center justify-center  bg-darkpurple text-center overflow-hidden ${
    selected ? selectedStyle : unselectedStyle
  } transition-opacity duration-500 hover:opacity-90 focus:opacity-90 shadow-md p-4 sm:p-6 md:p-8 overflow-hidden`;

  return (
    // <div className="relative mx-5 inline-block h-[380px] w-[450px]">
    <div
      className="relative group mx-auto flex flex-col items-center  overflow-hidden shadow-lg aspect-square w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg cursor-pointer"
      // className={`relative  flex-grow inline-block h-80 w-80 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl`}
      onClick={onSelect}
    >
      <div className={overlayStyles}>
        <h2 className="mb-2 font-bold text-sm md:text-lg text-white">{name}</h2>
        <p className="text-xs  text-gray-200 leading-normal">{description}</p>
      </div>
      <Image
        src={image}
        alt={`${image}`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105  overflow-hidden"
        priority
      />
    </div>
  );
};

export default OptionsCard;
