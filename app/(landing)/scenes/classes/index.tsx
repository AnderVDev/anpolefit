import { SelectedPage, ClassType } from "@/lib/types";
import image1 from "../../../../public/assets/foto1.png";
import { motion } from "framer-motion";
import HText from "../../shared/HText";
import Image from 'next/image';

// Importa Swiper y su módulo de navegación
import SwiperCore, { Navigation } from 'swiper';
// Importa los estilos de Swiper
import 'swiper/swiper-bundle.css';

import { Swiper, SwiperSlide } from "swiper/react";
import Class from "./Class";

// Inicializa Swiper con el módulo de navegación
SwiperCore.use([Navigation]);

const classes: Array<ClassType> = [
  { name: "Weight Training Classes", description: "Description 1", image: image1 },
  { name: "Yoga Classes", description: "Description 2", image: image1 },
  { name: "Ab Core Classes", description: "Description 3", image: image1 },
  { name: "Adventure Classes", description: "Description 4", image: image1 },
  { name: "Fitness Classes", description: "Description 5", image: image1 },
  { name: "Training Classes", description: "Description 6", image: image1 },
];

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const Classes = ({ setSelectedPage }: Props) => {
  return (
    <section id="ourclasses" className="w-full bg-primary-100 py-40">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.Classes)}
      >
        {/* Título */}
        <motion.div
          className="mx-auto w-5/6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <div className="md:w-3/5">
            <HText>OUR CLASSES</HText>
            <p className="py-5">
              Explore our wide range of classes designed to suit your fitness goals. From weight training to yoga, we have something for everyone.
            </p>
          </div>
        </motion.div>

        {/* Carrusel */}
        <div className="mt-10">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            navigation // Habilita la navegación
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="h-[353px]"
          >
            {classes.map((item, index) => (
              <SwiperSlide key={`${item.name}-${index}`}>
                <Class
                  name={item.name}
                  description={item.description}
                  image={item.image}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.div>
    </section>
  );
};

export default Classes;
