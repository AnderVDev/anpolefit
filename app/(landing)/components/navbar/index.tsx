import React from "react";
import Image from "next/image";
import { SelectedPage } from "@/lib/types";


interface Props {
  selectedPage: SelectedPage;
  isTopOfPage: boolean;
  setSelectedPage: (value: SelectedPage) => void;
}

function Navbar({ selectedPage, isTopOfPage, setSelectedPage }: Props) {
  const flexBetween = "flex items-center justify-between";
  const navbarBackground = isTopOfPage ? "" : "bg-primary-100 drop-shadow";

  return (
    <nav>
      <div
        className={`${flexBetween} ${navbarBackground} fixed top-0 z-30 w-full py-8`}
      >
        {/* Logo */}
        <section>
          <div>img</div>
          {/* <Image src="#" width={500} height={500} alt="Picture of Anpolefit" /> */}
        </section>
        {/* List */}

     
        <section></section>
        {/* Buttons */}
        <section>
          <div>buttons</div>
        </section>
      </div>
    </nav>
  );
}

export default Navbar;
