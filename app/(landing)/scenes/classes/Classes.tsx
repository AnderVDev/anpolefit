import Image, { StaticImageData } from "next/image";

type Props = {
  name: string;
  description?: string;
  image: string | StaticImageData; 
};

const Classes = ({
  name,
  description = "Some Default description",
  image,
}: Props) => {
  const overlayStyles = `p-5 absolute z-30 flex
    h-[380px] w-[450px] flex-col items-top justify-center
    whitespace-normal bg-darkpurple text-center text-white
    opacity-0 transition duration-500 hover:opacity-75`;

  return (
    <li className="relative mx-5 inline-block h-[380px] w-[450px]">
      <div className={overlayStyles}>
      <h1 className="text-2xl text-white font-black mb-1">{name}</h1>
        <p className="mt-2 text-lg h-auto leading-6">{description}</p>
      </div>
      <Image 
        src={image} 
        alt={name} 
        width={450} 
        height={380} 
        layout="responsive" 
        priority={true}
      />
    </li>
  );
};

export default Classes;