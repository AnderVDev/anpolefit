"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  const handleClick =  () => {
    signOut({
      callbackUrl: "/login",
    });
  };

  return <Button onClick={handleClick}>Logout</Button>;
};
export default LogoutButton;