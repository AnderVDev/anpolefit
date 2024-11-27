import { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "../_components/login-form";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function Login() {
  return (
    <>
    <div
    style={{ backgroundImage: "url('/assets/background03.jpg')" }} 
    >
      {/* Left side */}
      <div
      className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 bg-turquoise"
       
      >
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex  bg-transparent">
          <div className="absolute inset-0 " />
          <div className="relative z-20 flex items-center text-lg font-medium">
          <a href="/">
        <Image
          src="/assets/Logo Anpolefit_16.png"
          alt="Logo"
          className="h-full w-full object-cover"
          width={200} // Desired width
          height={100} // Proportional height to maintain the aspect ratio
          priority
        />
        </a>
          </div>
          <div className="relative z-20 mt-auto">
          



            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        {/* Right side */}
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <LoginForm OAuthAccountNotLinked={false} />
            <p className="px-8 text-center text-sm text-muted-foreground">
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
