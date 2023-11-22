"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  name: string;
  link: string;
}

const NavButton = ({ name, link }: Props) => {
  const { push } = useRouter();
  const router = useRouter();

  return (
    <button onClick={() => push("/" + link)} className="btn btn-ghost text-xl">
      {name}
    </button>
  );
};

export default NavButton;
