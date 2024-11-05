"use client"
import React, { useState } from "react";
import Home from "./scenes/home";
import Navbar from "./components/navbar";
import { SelectedPage } from "@/lib/types";

type Props = {};

function Landing({}: Props) {
  const [isTopOfPage, setIsTopofPage] = useState<boolean>(true);
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Home
  );
  return (
    <>
      <Navbar
        selectedPage={selectedPage}
        isTopOfPage={isTopOfPage}
        setSelectedPage={setSelectedPage}
      />
      {/* <Home /> */}
    </>
  );
}

export default Landing;
