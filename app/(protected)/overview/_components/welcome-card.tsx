import { Card } from "@/components/ui/card";
import React from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
function WelcomeCard() {
  const currentUser = useCurrentUser();
  const user = currentUser ? currentUser.name : "";
  return (
    <Card className="w-full h-full min-h-56 bg-[url('/assets/background01.jpg')] bg-contain bg-right bg-no-repeat bg-darkpurple flex flex-col p-4 shadow-xl">
      <span className="flex  items-center basis-3/5  text-3xl text-hotpink p">
        WELCOME
      </span>
      <h1 className=" text-4xl text-white font-bold">{user}</h1>
      <h6 className=" text-white font-medium pt-3">Glad to see you today!</h6>
    </Card>
  );
}

export default WelcomeCard;
