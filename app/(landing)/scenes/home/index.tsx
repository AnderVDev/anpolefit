import { SelectedPage } from "@/lib/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import ActionButton from "../../shared/ActionButton";
import Image from 'next/image';
import {homeDesign} from "@/lib/styles";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const Home: React.FC<Props> = ({ setSelectedPage }) => {

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }


  return (
    <section
      id="home"
      className={`${homeDesign} gap-16 bg-gray-20 py-10 md:h-full md:pb-0 bg-top-right bg-cover bg-no-repeat bg-darkpurple w-full min-h-500`}
      style={{ backgroundImage: "url('/assets/background01.jpg')" }} 
    >
      {/* IMAGE AND MAIN HEADER */}
      <motion.div
        className="mx-auto w-5/6 items-center justify-start md:flex md:h-5/6"
        onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
      >
        {/* MAIN HEADER */}
        <div className="z-10 mt-32 md:basis-3/5">
          {/* HEADINGS */}
          <motion.div
            className="md:-mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 2 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <div className="relative">
              <div className="before:absolute before:-left-20 before:-top-20 before:z-[-1] md:before:content-evolvetext">
                <Image
                  src="/assets/Logo1.png"
                  alt="logo"
                  width={370} // Set appropriate width
                  height={200} // Set appropriate height
                />
              </div>
            </div>
            <p className="mt-8 text-sm w-7/12">
              Unrivaled Gym. Unparalleled Training Fitness Classes. World Class
              Studios to get the Body Shapes That you Dream of.. Get Your Dream
              Body Now.
            </p>
          </motion.div>
          {/* ACTIONS */}
          <motion.div
            className="mt-8 flex items-center gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 1 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <ActionButton setSelectedPage={setSelectedPage}>
              Join Now
            </ActionButton>
            <AnchorLink
              className="text-sm font-bold text-primary-500 underline hover:text-secondary-500"
              onClick={() => setSelectedPage(SelectedPage.Contact)}
              href={`#${SelectedPage.Contact}`}
            >
              <p>Learn More</p>
            </AnchorLink>
          </motion.div>
        </div>
        
      </motion.div>
    </section>
  );
};

export default Home;
