"use client";
import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";

type User =
  | {
      name?: string | null | undefined;
      email?: string | null | undefined;
    }
  | undefined;

interface Props {
  user: User;
  page: string;
}

const UserPanel = async ({ user, page }: Props) => {
  const NoUser = !user ? (
    <div className="card card-side bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">No user Signed In</h2>
        <ul className="menu bg-base-200 w-56 rounded-box">
          <li>
            <Link href="/api/auth/signin">Sign in</Link>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
        </ul>
      </div>
    </div>
  ) : null;
  const UserLogged = user ? (
    <div className="card card-side bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{user.name}</h2>
        <h2 className="card-title">{user.email}</h2>
        <ul className="menu bg-base-200 w-56 rounded-box">
          <li>
            <Link href="/api/auth/signout">Sign Out</Link>
          </li>
        </ul>
      </div>
    </div>
  ) : null;
  return (
    <>
      {" "}
      {UserLogged}
      {NoUser}
    </>
  );
};

export default UserPanel;
