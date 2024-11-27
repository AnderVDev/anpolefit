import Image, { StaticImageData } from "next/image";


type Props = {
  name: string;
  description?: string; // Hacemos que la descripción sea opcional
  image: string | StaticImageData; // Maneja rutas y objetos de imagen
};

const Classes = ({
  name,
  description = "Some Default description",
  image,
}: Props) => {
  const overlayStyles = `p-5 absolute z-30 flex
    h-[380px] w-[450px] flex-col items-center justify-center
    whitespace-normal bg-primary-500 text-center text-white
    opacity-0 transition duration-500 hover:opacity-90`;

  return (
    <li className="relative mx-5 inline-block h-[380px] w-[450px]">
      <div className={overlayStyles}>
        <p className="text-2xl">{name}</p>
        <p className="mt-5">{description}</p>
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