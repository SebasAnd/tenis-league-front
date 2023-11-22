"use client";
import { emit } from "process";
import React, { useState } from "react";
import AddToCard from "../components/AddToCard";
import Link from "next/link";

type User = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  is_admin?: boolean | null | undefined;
  image?: string | null | undefined;
};
interface Props {
  user?: User;
}
const DataInput = ({ user }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");

  async function handleSaveClick() {
    console.log("clicked", email, name, password, nickName);
    return <></>;
  }
  return (
    <div>
      <div className="particularForm">
        Email:{" "}
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div>
        Password:{" "}
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div>
        Name:{" "}
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      <div>
        NickName:{" "}
        <input
          id="nname"
          type="text"
          value={nickName}
          onChange={(e) => {
            setNickName(e.currentTarget.value);
          }}
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div>
        <Link
          id="sendLink"
          href={{
            pathname: "/result",
            query: {
              email: email,
              password: password,
              is_admin: false,
              name: name,
              nickName: nickName,
            },
          }}
          className="btn btn-primary"
        >
          Save
        </Link>
      </div>
    </div>
  );
};

export default DataInput;
