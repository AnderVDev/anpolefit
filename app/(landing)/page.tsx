import React from "react";
import Home from "./scenes/home";
import Navbar from "./components/navbar"

type Props = {};

function Landing({}: Props) {
  return (
    <>
      <Navbar />
      <Home />

    </>
  );
}

export default Landing;
