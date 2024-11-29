import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "../_components/register-form";
import { ChatBubbleLeftEllipsisIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { CalculatorIcon } from "@heroicons/react/24/solid";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function SignUp() {
  return (
    <>
      <div
        style={{ backgroundImage: "url('/assets/background04c.jpg')" }}
        className="bg-no-repeat bg-right-top md:bg-center-bottom bg-midpink h-full"
      >
        <div className="container relative h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 bg-transparent">
          {/* Left side */}
          <div className="relative h-full flex-col p-10 text-white dark:border-r lg:flex bg-transparent">
            <div className="relative z-20 flex items-center text-lg font-medium">

            <section className="bg-white bg-opacity-70 text-darkpurple p-5 rounded-2xl">
          <a href="/">
        <Image
          src="/assets/LogoAnpolefit_4.png"
          alt="Logo"
          className="h-full w-8/12 object-cover mx-0 my-auto"
          width={300} // Desired
          height={100} // Proportional height to maintain the aspect ratio
          priority
        />
        </a>

              <div className="mt-8">
                <UserGroupIcon className="h-11 w-11 float-left mr-2 mt-1 bg-white rounded-full p-1" />
                <h1 className="text-hotpink">
                  Become a Member and Experience the Full Journey
                </h1>
                <p className="text-lg">
                  By joining our community, you will gain access to a personalized
                  experience that allows you to track your progress and achieve
                  your goals more effectively.
                </p>
              </div>

              <div className="mt-8">
                <CalendarDaysIcon className="h-11 w-11 float-left mr-2 mt-1 bg-white rounded-full p-1" />
                <h1 className="text-hotpink">Historical Tracking of Your Progress</h1>
                <p className="text-lg">
                  Keep a detailed record of your progress, so you can see how
                  you’re improving in strength, endurance, and overall well-being,
                  celebrating every achievement.
                </p>
              </div>

              <div className="mt-8">
                <ShoppingCartIcon className="h-11 w-11 float-left mr-2 mt-1 bg-white rounded-full p-1" />
                <h1 className="text-hotpink">Complete Personalized Nutrition Guide</h1>
                <p className="text-lg">
                  Receive a meal plan tailored to your specific needs and goals,
                  designed to complement your workouts and help you feel better
                  from the inside out.
                </p>
              </div>

              <div className="mt-8">
                <CalculatorIcon className="h-11 w-11 float-left mr-2 mt-1 bg-white rounded-full p-1" />
                <h1 className="text-hotpink">BMI Calculator</h1>
                <p className="text-lg">
                  Assess your current condition with our Body Mass Index (BMI)
                  calculator, a simple yet effective tool to understand your
                  physical state.
                </p>
              </div>

              <div className="mt-8">
                <ChatBubbleLeftEllipsisIcon className="h-11 w-11 float-left mr-2 mt-1 bg-white rounded-full p-1" />
                <h1 className="text-hotpink">Personalized Tips from Your Coach</h1>
                <p className="text-lg">
                  Get direct guidance from your coach with personalized advice on
                  exercises, nutrition, and overall wellness to keep you motivated
                  and on track.
                </p>
              </div>
            </section>
            </div>
          </div>

          {/* Right side */}
          <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <RegisterForm />
              <p  className="px-8 text-center text-sm text-muted-foreground text-white">
                By clicking continue, you agree to our{" "}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
