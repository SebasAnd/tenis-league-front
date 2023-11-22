import React from "react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export const googleValidation = async () => {
  const session = await getServerSession(options);
  async function CheckGoogleUser() {
    try {
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
      user["image"] = "" + user.is_admin;
      if (session && session.user) {
        session.user.image = "" + user.is_admin;
      }
    } catch (error) {
      return null;
    }
  }

  if (session?.user?.image != undefined && session?.user?.image != null) {
    await CheckGoogleUser();
  }
  return <div>googleValidation</div>;
};
