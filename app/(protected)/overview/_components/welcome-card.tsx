import { Card } from "@/components/ui/card";
import React from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
function WelcomeCard() {
  const currentUser = useCurrentUser();
  const user = currentUser ? currentUser.name : "";
  return (
    <Card className="w-full h-full">
      <span>Welcome back,</span>
      <h1>{user}</h1>
      <h6>Glad to see you again!</h6>
    </Card>
  );
}

export default WelcomeCard;
