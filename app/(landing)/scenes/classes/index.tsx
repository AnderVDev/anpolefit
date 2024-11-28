import { SelectedPage,  ClassType} from "@/lib/types";
import image1 from "@/public/assets/photo002.jpg";
import image2 from "@/public/assets/photo003.jpg";
import image3 from "@/public/assets/photo004.jpg";
import image4 from "@/public/assets/photo005.jpg";
import image5 from "@/public/assets/photo006.jpg";
import image6 from "@/public/assets/photo007.jpg";
import { motion } from "framer-motion";
import HText from "../../shared/HText";
import Classes from "./Classes";


const classes: Array<ClassType> = [
  {
    name: "Online Training Plan",
    description:
      "We’ll train together five days a week, connecting via Zoom to move, dance, meditate, and strengthen our connection with ourselves. We’ll break through mental barriers and enjoy the transformation power of movement. This is your chance to connect, grow, and feel better than ever! Join us and experience the change!",
    image: image1,
  },
  {
    name: "Live Training Plan",
    description:
      "This plan is designed to help you enjoy movement. I’ll guide you in person, explaining each exercise in detail so you can train safely and avoid injuries, while keeping your menstrual cycle in mind. Plus, you’ll have continuous support through WhatsApp so you never feel alone in the process.  It’s the personalized guidance you need to feel strong and connected to your body!",
    image: image2,
  },
  {
    name: "Energizing Workouts",
    description:
      "Our workouts are not just about sweating but also about empowering you. From strength sessions to high-impact cardio, every class is designed to help you unlock your full potential and achieve your goals with confidence.",
    image: image3,
  },
  {
    name: "Mindful Movements",
    description:
      "For those moments when you need to reconnect with your body and mind, we offer yoga and mindfulness classes. Each breath helps you release tension, find calm, and balance your energy.",
    image: image4,
  },
  {
    name: "Fun in Motion",
    description:
      "Because working out should also be fun, our dance and Zumba classes let you unleash your creativity, enjoy the rhythm, and move your body with joy and energy.",
    image: image5,
  },
  {
    name: "Classes Tailored to You",
    description:
      "Whether you're looking to improve flexibility, tone your body, or simply feel better about yourself, our classes are adapted to different levels and needs. Every woman is unique, and we make sure to provide an inclusive and flexible space for all.",
    image: image6,
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
          <div className="md:w-4/5">
            <HText>OUR <span className="text-darkpurple font-black">CLASSES</span></HText>
            <p className="py-5  text-xl">
            Our workouts will not only make you sweat, but they will also empower you. From strength sessions to high-impact cardio, each class is designed to help you unleash your full potential and achieve your goals with confidence.</p>
            <p className="font-bold   text-xl mt-4">Progressive sessions tailored to the equipment you have at home or at the gym. We’ll meet every day from Monday to Friday to build the habit together.
            Trust me, it’ll be fun!</p>
            
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
