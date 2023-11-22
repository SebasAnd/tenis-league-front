"use server";
import React from "react";
import NavBar from "../components/Tools/NavBar";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import Tooltip from "../components/Tools/Tooltip";
import CrudButton from "../components/Tools/CrudButton";
import UsersTable from "./usersTable";

/*{users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))} */

type User = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  is_admin?: boolean | null | undefined;
  password?: string | null | undefined;
  nickname?: string | null | undefined;
};
const UsersPage = async () => {
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

  async function GetUsers() {
    try {
      const res = await fetch(process.env.APP_URL + "/getUsers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return null;
    }
  }

  if (session?.user?.image != undefined && session?.user?.image != null) {
    await CheckGoogleUser();
  }

  const allUsersData = (await GetUsers()) as User[];
  const userList =
    session?.user?.image === "true" ? (
      <>
        <UsersTable allUsersData={allUsersData} />
      </>
    ) : (
      <>
        <h1>UNATHORIZED, sign in with an admin account</h1>{" "}
      </>
    );
  return <div>{userList}</div>;
};

export default UsersPage;
