"use server";
import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import DataInput from "./dataInput";

const AddUser = async () => {
  const session = await getServerSession(options);
  async function CheckGoogleUser() {
    const res = await fetch(process.env.APP_URL + "/checkUserGoogle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ username: session?.user?.email }),
    });
    const data = await res.json();
    const user = data[0];
    if (user) {
      user["image"] = user.is_admin ? user.is_admin : "false";
      if (session && session.user) {
        session.user.image = "" + user.is_admin;
      }
    }
  }

  if (session?.user?.image != undefined && session?.user?.image != null) {
    await CheckGoogleUser();
  }
  return (
    <div>
      <DataInput user={session?.user}></DataInput>
    </div>
  );
};

export default AddUser;
