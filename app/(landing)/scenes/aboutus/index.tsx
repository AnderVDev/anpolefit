import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SelectedPage } from "@/lib/types";
import HText from "../../shared/HText";
import ActionButton from "../../shared/ActionButton";
import Image from 'next/image';

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const aboutusData = [
  {
    title: "State-of-the-Art Equipment",
    description: "We provide top-notch equipment for your fitness journey.",
    icon: "🏋️‍♂️",
  },
  {
    title: "Expert Trainers",
    description: "Our trainers are here to guide and motivate you.",
    icon: "👨‍🏫",
  },
  {
    title: "Variety of Classes",
    description: "Choose from a wide range of fitness classes.",
    icon: "🧘‍♀️",
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
    <section id="aboutus" className="mx-auto min-h-full w-5/6 py-20">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.AboutUs)}
      >
        {/* HEADER */}
        <motion.div
          className="md:my-5 md:w-3/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <HText>More Than Just a GYM.</HText>
          <p className="my-5 text-sm">
            We provide world-class fitness equipment, trainers, and classes to
            get you to your ultimate fitness goals with ease. We care for each
            and every member.
          </p>
        </motion.div>

        {/* ABOUT US */}
        <motion.div
          className="mt-5 items-center justify-between gap-8 md:flex"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={container}
        >
          {aboutusData.map((benefit) => (
            <div key={benefit.title} className="text-center">
              <div className="text-4xl">{benefit.icon}</div>
              <h3 className="font-bold">{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </motion.div>

        {/* GRAPHICS AND DESCRIPTION */}
        <div className="mt-16 items-center justify-between gap-20 md:mt-28 md:flex">
          {/* GRAPHIC */}
          <Image
                  src="/assets/Logo1.png"
                  alt="logo"
                  width={370} // Set appropriate width
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
              <HText>
                MILLIONS OF HAPPY MEMBERS GETTING{" "}
                <span className="text-primary-500">FIT</span>
              </HText>
              <p className="my-5">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Corporis unde aliquam dignissimos doloremque.
              </p>
            </motion.div>

            {/* BUTTON */}
            <div className="relative mt-16">
              <div className="before:absolute before:-bottom-20 before:right-40 before:z-[-1] before:content-sparkles">
                <ActionButton setSelectedPage={setSelectedPage}>
                  Join Now
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutUs;