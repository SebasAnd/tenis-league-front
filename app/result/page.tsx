import React from "react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
type Params = {
  searchParams: {
    email?: string;
    name?: string;
    password?: string;
    nickName?: string;
    is_admin?: boolean;
  };
};

const Resultpage = async ({ searchParams }: Params) => {
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
      if (user) {
        user["image"] = user.is_admin ? user.is_admin : "false";
        if (session && session.user) {
          session.user.image = "" + user.is_admin;
        }
      }
    } catch (error) {
      return null;
    }
  }

  if (session?.user?.image != undefined && session?.user?.image != null) {
    await CheckGoogleUser();
  }
  async function AddUser() {
    try {
      const res = await fetch(process.env.APP_URL + "/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          email: searchParams.email,
          name: searchParams.name,
          is_admin: searchParams.is_admin,
          nick_name: searchParams.nickName,
          password: searchParams.password,
        }),
      });
      const data = await res.json();
      const user = data;
      console.log(data);
      if (data.error) {
        result = (
          <>
            <div>
              <span>ERROR, the user was not created</span>
            </div>
            <div>
              <Link className="btn btn-primary" href={"/register"}>
                Volver
              </Link>
            </div>
          </>
        );
      } else {
        result = (
          <>
            <div>
              <span>User created successfully! </span>
            </div>
            <div>
              <Link className="btn btn-primary" href={"/"}>
                Volver
              </Link>
            </div>
          </>
        );
      }
    } catch (error) {
      return null;
    }
  }
  //"command": "INSERT"

  console.log(searchParams.name, searchParams.email);
  let result = (
    <div>
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
  await AddUser();

  return <>{result}</>;
};

export default Resultpage;
