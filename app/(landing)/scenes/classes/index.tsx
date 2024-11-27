import { SelectedPage,  ClassType} from "@/lib/types";
import image1 from "../../../../public/assets/foto1.png";
import { motion } from "framer-motion";
import HText from "../../shared/HText";
import Classes from "./Classes";


const classes: Array<ClassType> = [
  {
    name: "Weight Training Classes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque modi cum doloremque amet veritatis libero placeat non iure dignissimos porro suscipit totam voluptatibus cupiditate, voluptatum commodi incidunt nostrum iusto. Eos.",
    image: image1,
  },
  {
    name: "Yoga  Classes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque modi cum doloremque amet veritatis libero placeat non iure dignissimos porro suscipit totam voluptatibus cupiditate, voluptatum commodi incidunt nostrum iusto. Eos.",
    image: image1,
  },
  {
    name: "Ab Core Classes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque modi cum doloremque amet veritatis libero placeat non iure dignissimos porro suscipit totam voluptatibus cupiditate, voluptatum commodi incidunt nostrum iusto. Eos.",
    image: image1,
  },
  {
    name: "Adventure Classes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque modi cum doloremque amet veritatis libero placeat non iure dignissimos porro suscipit totam voluptatibus cupiditate, voluptatum commodi incidunt nostrum iusto. Eos.",
    image: image1,
  },
  {
    name: "Fitness Classes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque modi cum doloremque amet veritatis libero placeat non iure dignissimos porro suscipit totam voluptatibus cupiditate, voluptatum commodi incidunt nostrum iusto. Eos.",
    image: image1,
  },
  {
    name: "Training Classes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque modi cum doloremque amet veritatis libero placeat non iure dignissimos porro suscipit totam voluptatibus cupiditate, voluptatum commodi incidunt nostrum iusto. Eos.",
    image: image1,
  },
];

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const OurClasses = ({ setSelectedPage }: Props) => {
  return (
    <section id="classes" className="w-full bg-hotpink py-24">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.Classes)}
      >
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
            <HText>OUR <span className="text-darkpurple">CLASSES</span></HText>
            <p className="py-5  text-xl">
            Our workouts will not only make you sweat, but they will also empower you. From strength sessions to high-impact cardio, each class is designed to help you unleash your full potential and achieve your goals with confidence.
            </p>
          </div>
        </motion.div>
        <div className="mt-10 h-[353px] w-full overflow-x-auto overflow-y-hidden">
          <ul className="w-[2800px] whitespace-nowrap">
            {classes.map((item: ClassType, index) => (
              <Classes
                key={`${item.name}-${index}`}
                name={item.name}
                description={item.description}
                image={item.image}
              />
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
};

export default OurClasses;
