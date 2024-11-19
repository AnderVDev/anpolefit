import React from "react";
import Image from "next/image";
import Logo from "@/assets/LogoAnpolefit_1.png"
import { SelectedPage } from "@/lib/types";
import Link from "./Link";
import { generalContent, mainBackground } from "@/lib/styles";


interface Props {
  selectedPage: SelectedPage;
  isTopOfPage: boolean;
  setSelectedPage: (value: SelectedPage) => void;
}

function Navbar({ selectedPage, isTopOfPage, setSelectedPage }: Props) {
  const flexBetween = "flex items-center justify-between";
  const navbarBackground = isTopOfPage ? "" : "bg-primary-100 drop-shadow";

  return (
    <nav className={`${generalContent} bg-darkpurple`}>
      <div
        className={`${flexBetween} ${navbarBackground} fixed top-0 z-30 w-full py-8`}
      >
        {/* Logo */}
        <section>
          <a href="#"><Image src={Logo} alt="Logo" width={200} /></a>
        </section>
        {/* List */}

     
        <section>
        <Link
          page='Home'
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
        <Link
          page='About Us'
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
        <Link
          page='Classes'
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
        <Link
          page='Contact'
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />

        </section>
        {/* Buttons */}
        <section>
          <div>buttons</div>
        </section>
      </div>
    </nav>
  );
}

export default Navbar;