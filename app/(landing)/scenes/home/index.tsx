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
const button_menu = "bg-hotpink rounded-full text-lg text-white px-6";
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
      className={`${homeDesign} gap-16 bg-gray-20 py-10 md:h-full md:pb-0 bg-top-right bg-cover bg-no-repeat bg-darkpurple w-full min-h-screen`}
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
              <div className="before:absolute -mt-20 ml-11 md:ml-3 before:-left-15 before:-top-50 before:z-[-1] md:before:content-evolvetext">
                <Image
                  src="/assets/Logo1.png"
                  alt="logo"
                  width={350} // Set appropriate width
                  height={200} // Set appropriate height
                />
              </div>
            </div>
            <p className="mt-5 ml-6 md:ml-1  text-3xl font-bold text-hotpink">WELCOME</p>
            <p className="mt-0 ml-4 md:ml-1  text-4xl font-bold text-turquoise">TO YOUR SPACE !</p>
            <p className="mt-4 ml-2 md:ml-2  text-m w-10/12 md:w-6/12  lg:-6/12">Here, you’ll not only strengthen your body but also empower your mind and connect with your inner self. Our programs are designed exclusively for women like you—strong, determined, and ready to become the best version of themselves.</p>
            <p className="mt-2 ml-2 md:ml-2  text-xl w-10/12  font-bold md:w-6/12 text-lightpurple lg:-6/12">Are you ready to embark on this journey full of energy, purpose, and growth?
            <br/>Log in now to start turning your goals into reality.
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
            <div className={`${button_menu} gap-8 mb-10`}>
                  <a href="/login">Join Now</a>
                </div>
            
          </motion.div>
        </div>
        
      </motion.div>
    </section>
  );
};

export default Home;
