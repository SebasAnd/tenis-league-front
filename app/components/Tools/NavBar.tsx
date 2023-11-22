"use client";

import React from "react";
import NavButton from "../NavButton";

interface Props {
  menuButton?: React.ReactNode;
}

const NavBar = ({ menuButton }: Props) => {
  return (
    <div className="navbar bg-neutral text-neutral-content">
      {menuButton}
      <NavButton name="Home" link="" />
    </div>
  );
};

export default NavBar;
