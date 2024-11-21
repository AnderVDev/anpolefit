import Image from "next/image";

type Props = {
  name: string;
  description: string;
  image: string; // Ruta de la imagen
};

const Class = ({ name, description, image }: Props) => {
  return (
    <li className="inline-block mx-5">
      {/* Usa el componente Image */}
      <Image
        src={image}
        alt={`${name} image`}
        width={450} // Ajusta el tamaño según lo que necesites
        height={380}
        className="rounded-lg"
      />
      <h3 className="text-lg font-bold mt-4">{name}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </li>
  );
};

export default Class;
