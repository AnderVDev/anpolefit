"use client"
import React, { useState } from "react";
import Home from "./scenes/home";
import AboutUs from "./scenes/aboutus";
import Classes from "./scenes/classes";
import Contact from "./scenes/contact";
import Footer from "./components/footer";
import {mainBackground } from "@/lib/styles";

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
    <body className={`${mainBackground} bg-hotpink`}>
      <Navbar
        isTopOfPage={isTopOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
      <Home />
      <AboutUs />
      <Classes />
      <Contact />
      <Footer />

     </body>
    </>
  );
}

export default Landing;