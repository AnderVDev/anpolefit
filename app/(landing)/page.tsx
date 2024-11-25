"use client";
import React, { useEffect, useState } from "react";
import Home from "./scenes/home";
import AboutUs from "./scenes/aboutus";
import Classes from "./scenes/classes";
import NewsLetter from "./scenes/newsLetter";
import Footer from "./components/footer";

import Navbar from "./components/navbar";
import { SelectedPage } from "@/lib/types";


function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Home,
  );
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage(SelectedPage.Home);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <>

      <div className={`w-full text-white`}>
        <Navbar
          isTopOfPage={isTopOfPage}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
        <Home setSelectedPage={setSelectedPage} />
        <AboutUs setSelectedPage={setSelectedPage} />
        <Classes setSelectedPage={setSelectedPage} />
        <NewsLetter setSelectedPage={setSelectedPage} />
        <Footer />

      </div>

    </>
  );
}

export default App;