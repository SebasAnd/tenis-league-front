"use client";
import React, { useState } from "react";

interface Props {
  checked?: boolean;
  disable?: boolean;
  onChange?: (e: boolean) => void;
}
const Tooltip = ({ checked, disable, onChange }: Props) => {
  const [is_admin, setIsAdmin] = useState(checked);
  return (
    <input
      type="checkbox"
      value={"" + is_admin}
      className="toggle toggle-accent"
      disabled={disable ? disable : false}
      checked={checked ? checked : false}
      readOnly
    />
  );
};

export default Tooltip;
