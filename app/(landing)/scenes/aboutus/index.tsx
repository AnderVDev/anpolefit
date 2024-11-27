import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SelectedPage } from "@/lib/types";
import HText from "../../shared/HText";
import Image from 'next/image';
 
type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};
const circuloIcono ="bg-turquoise content-center w-16 h-16 p-2 rounded-full border-solid border-lightturquoise border-2 block mx-auto mb-4 -mt-12";
const button_menu = "bg-hotpink rounded-full text-lg text-white px-6";
const aboutusData = [
  {
    title: "A Journey Tailored to You",
    description: "We design every workout to align with your needs, energy levels, and unique goals, ensuring you feel supported and empowered at every stage.",
    icon: <div className={`${circuloIcono}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path fill="#ffffff"  d="M320 64A64 64 0 1 0 192 64a64 64 0 1 0 128 0zm-96 96c-35.3 0-64 28.7-64 64l0 48c0 17.7 14.3 32 32 32l1.8 0 11.1 99.5c1.8 16.2 15.5 28.5 31.8 28.5l38.7 0c16.3 0 30-12.3 31.8-28.5L318.2 304l1.8 0c17.7 0 32-14.3 32-32l0-48c0-35.3-28.7-64-64-64l-64 0zM132.3 394.2c13-2.4 21.7-14.9 19.3-27.9s-14.9-21.7-27.9-19.3c-32.4 5.9-60.9 14.2-82 24.8c-10.5 5.3-20.3 11.7-27.8 19.6C6.4 399.5 0 410.5 0 424c0 21.4 15.5 36.1 29.1 45c14.7 9.6 34.3 17.3 56.4 23.4C130.2 504.7 190.4 512 256 512s125.8-7.3 170.4-19.6c22.1-6.1 41.8-13.8 56.4-23.4c13.7-8.9 29.1-23.6 29.1-45c0-13.5-6.4-24.5-14-32.6c-7.5-7.9-17.3-14.3-27.8-19.6c-21-10.6-49.5-18.9-82-24.8c-13-2.4-25.5 6.3-27.9 19.3s6.3 25.5 19.3 27.9c30.2 5.5 53.7 12.8 69 20.5c3.2 1.6 5.8 3.1 7.9 4.5c3.6 2.4 3.6 7.2 0 9.6c-8.8 5.7-23.1 11.8-43 17.3C374.3 457 318.5 464 256 464s-118.3-7-157.7-17.9c-19.9-5.5-34.2-11.6-43-17.3c-3.6-2.4-3.6-7.2 0-9.6c2.1-1.4 4.8-2.9 7.9-4.5c15.3-7.7 38.8-14.9 69-20.5z"/>
    </svg></div>,
  },
  {
    title: "A Community of Support",
    description: "Our space is a circle of encouragement, where women inspire each other to grow, laugh, and overcome challenges together.",
    icon: <div  className={`${circuloIcono}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="43" height="43">
      <path  fill="#ffffff" d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z"/></svg></div>,
  },
  {
    title: "Wellness Beyond Workouts",
    description: "From mindful movement to stress relief, we focus on holistic well-being, helping you cultivate strength from the inside out.",
    icon: <div className={`${circuloIcono}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
      <path  fill="#ffffff"  d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9l2.6-2.4C267.2 438.6 256 404.6 256 368c0-97.2 78.8-176 176-176c28.3 0 55 6.7 78.7 18.5c.9-6.5 1.3-13 1.3-19.6l0-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1l0 5.8c0 41.5 17.2 81.2 47.6 109.5zM576 368a144 144 0 1 0 -288 0 144 144 0 1 0 288 0zm-76.7-43.3c6.2 6.2 6.2 16.4 0 22.6l-72 72c-6.2 6.2-16.4 6.2-22.6 0l-40-40c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L416 385.4l60.7-60.7c6.2-6.2 16.4-6.2 22.6 0z"/></svg></div>,
    
  },


  
];

const AboutUs: React.FC<Props> = ({ setSelectedPage }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  const container = { 
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section id="aboutus" className="mx-auto min-h-full text-center w-6/6 py-8 px-20 bg-turquoise text-darkpurple">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.AboutUs)}
      >
        {/* HEADER */}
        <motion.div
          className="md:mt-16 md:mx-auto w-5/5 md:w-4/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <HText>MORE THAN <span className="text-hotpink">JUST TRAINING</span></HText>
          <p className="mt-4 text-xl">
          We are a space where women come to rediscover themselves—building strength, fostering inner balance, and embracing joy in every movement. Here, fitness is not just about the body; it’s about creating harmony between mind, body, and spirit.
          </p>
        </motion.div>

        {/* ABOUT US */}
        
        <motion.div
          className="mt-5 items-center justify-between gap-8 md:flex flex-nowrap items-stretch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={container}
        >
          {aboutusData.map((benefit) => (
            <div key={benefit.title} className="text-center bg-white bg-opacity-20 border-solid border-lightturquoise border p-4 shadow-xl md:w-1/3 rounded flex-1  mt-10  ">
              <div className="text-4xl">{benefit.icon}</div>
              <h3 className="font-bold text-hotpink text-xl">{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </motion.div>
        
        {/* GRAPHICS AND DESCRIPTION */}
        <div className="mt-16 items-center justify-between gap-20 md:mt-4 md:flex">
          {/* GRAPHIC */}
          <Image
                  src="/assets/photo001.png"
                  alt="logo"
                  width={500} // Set appropriate width
                  height={200} // Set appropriate height
                />

          {/* DESCRIPTION */}
          <div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1 }}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              

              <HText>COACHING <span className="text-hotpink">WITH CARE</span></HText>
              <p className="mt-2 mb-0 text-xl">
              Our training programs combine expertise with empathy, nurturing your physical and emotional health.
              <br/> <br/> Join us today and enjoy personalized coaching, tailored meal plans, progress tracking, and a supportive community!
              </p>
            </motion.div>

            {/* BUTTON */}
            <div className="relative mt-8">
            <div className={`${button_menu} gap-8 w-32 mt-3 mb-0 mx-auto`}>
                  <a href="/login">Join Now</a>
                </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutUs;